// extension.js - Main GNOME Shell Extension
// Unicode Font Converter for GNOME 43

const { St, Clutter, Gio, GLib, Pango, PangoCairo, GObject } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

// Import Unicode mapping functions
const UnicodeMaps = Me.imports.unicodeMaps;

// Font used to render the transformed Unicode characters
const FONT_FILE_NAME = 'Symbola_hint.ttf';

/**
 * Check whether Pango can render the given codepoint with the current
 * system fonts, including the full fontconfig fallback chain.
 */
function _fontHasGlyph(codepoint) {
    try {
        const fontmap = PangoCairo.FontMap.get_default();
        const context = fontmap.create_context();
        const description = Pango.FontDescription.from_string('Sans 12');
        const fontset = context.load_fontset(description, Pango.Language.get_default());
        const font = fontset.get_font(codepoint);
        return font.has_char(String.fromCodePoint(codepoint));
    } catch (e) {
        return false;
    }
}

/**
 * Install the bundled font into the user fonts directory if the glyphs
 * are not covered by any installed system font yet.
 */
function _ensureFontInstalled() {
    const fontDir = GLib.build_filenamev([
        GLib.get_home_dir(), '.local', 'share', 'fonts', 'unicode-font-converter'
    ]);
    const targetFont = GLib.build_filenamev([fontDir, FONT_FILE_NAME]);

    if (Gio.File.new_for_path(targetFont).query_exists(null))
        return;

    if (_fontHasGlyph(0x1D49C) && _fontHasGlyph(0x1F150))
        return;

    const sourceFile = Gio.File.new_for_path(
        Me.dir.get_child('data/fonts/' + FONT_FILE_NAME).get_path()
    );
    if (!sourceFile.query_exists(null)) {
        log('Unicode Font Converter: bundled font not found');
        return;
    }

    try {
        GLib.mkdir_with_parents(fontDir, 0o755);
        sourceFile.copy(
            Gio.File.new_for_path(targetFont),
            Gio.FileCopyFlags.OVERWRITE,
            null, null
        );
        GLib.spawn_command_line_async('fc-cache -f');
        Main.notify('Unicode Font Converter',
            'Unicode font installed. Please reload GNOME Shell (log out/in or Alt+F2 r) to see the font previews.');
    } catch (e) {
        log(`Unicode Font Converter: could not install font: ${e}`);
    }
}

// Extension state
let unicodeFontIndicator;
let settings;

/**
 * Unicode Font Converter Panel Button
 */
const UnicodeFontIndicator = GObject.registerClass(
class UnicodeFontIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'Unicode Font Converter');
        
        // Create panel icon (custom SVG with fallback to a theme icon)
        const iconFile = Gio.File.new_for_path(Me.path + '/icons/font-converter.svg');
        const iconProps = { style_class: 'system-status-icon' };
        if (iconFile.query_exists(null))
            iconProps.gicon = new Gio.FileIcon({ file: iconFile });
        else
            iconProps.icon_name = 'font-select-symbolic';
        let icon = new St.Icon(iconProps);
        this.add_child(icon);
        
        // Initialize settings
        this._settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.unicode-font-converter');
        
        // Current state
        this._currentFont = this._settings.get_string('selected-font');
        this._inputText = '';
        
        // Build UI
        this._buildUI();
        
        // Connect settings change
        this._settingsChangedId = this._settings.connect('changed::selected-font', () => {
            this._currentFont = this._settings.get_string('selected-font');
            this._updateFontOrnaments();
            this._updatePreview();
        });
    }
    
    _buildUI() {
        // Override itemActivated so selecting a font style keeps the menu open.
        // PopupMenu._connectItemSignals() calls menu.itemActivated() after every
        // item 'activate', which closes the menu (popupMenu.js). We intercept it.
        const itemActivatedOrig = this.menu.itemActivated.bind(this.menu);
        this.menu.itemActivated = (animate) => {
            if (this._keepMenuOpen) {
                this._keepMenuOpen = false;
                return;
            }
            itemActivatedOrig(animate);
        };
        
        // Font selection section
        let fontSection = new PopupMenu.PopupMenuSection();
        this.menu.addMenuItem(fontSection);
        
        // Font selector label
        let fontLabel = new PopupMenu.PopupMenuItem('Font Style:', { reactive: false });
        fontLabel.label.style = 'font-weight: bold;';
        fontSection.addMenuItem(fontLabel);
        
        // Font style buttons (current selection is highlighted)
        this._fontItems = [];
        const fontStyles = UnicodeMaps.getFontStyles();
        fontStyles.forEach(style => {
            let item = new PopupMenu.PopupMenuItem(
                UnicodeMaps.transformText(style.name, style.key)
            );
            item.connect('activate', () => {
                this._keepMenuOpen = true;
                this._selectFont(style.key);
            });
            fontSection.addMenuItem(item);
            this._fontItems.push({ key: style.key, item });
        });
        
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        
        // Input + preview (compact, no labels)
        let inputSection = new PopupMenu.PopupMenuSection();
        this.menu.addMenuItem(inputSection);
        
        this._inputEntry = new St.Entry({
            hint_text: 'Type or paste your content here',
            track_hover: true,
            can_focus: true,
            style_class: 'unicode-input-entry',
            x_expand: true
        });
        
        this._inputEntry.clutter_text.connect('text-changed', () => {
            this._inputText = this._inputEntry.get_text();
            this._updatePreview();
        });
        
        // Enter copies to clipboard, clears the input and closes the popup
        this._inputEntry.clutter_text.connect('activate', () => {
            this._copyToClipboard();
            this._clearInput();
            this.menu.close();
        });
        
        let inputItem = new PopupMenu.PopupBaseMenuItem({ reactive: false });
        inputItem.add_child(this._inputEntry);
        inputSection.addMenuItem(inputItem);
        
        // Preview directly below the input, fixed height
        this._previewLabel = new St.Label({
            text: '',
            style_class: 'unicode-preview-label',
            x_expand: true
        });
        this._previewLabel.clutter_text.set_line_wrap(true);
        this._previewLabel.clutter_text.set_line_wrap_mode(imports.gi.Pango.WrapMode.WORD_CHAR);
        
        let previewItem = new PopupMenu.PopupBaseMenuItem({ reactive: false });
        previewItem.add_child(this._previewLabel);
        inputSection.addMenuItem(previewItem);
        
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        
        // Copy button (clears the input, menu closes via itemActivated)
        let copyButton = new PopupMenu.PopupMenuItem('Copy to Clipboard or press Enter');
        copyButton.connect('activate', () => {
            this._copyToClipboard();
            this._clearInput();
        });
        this.menu.addMenuItem(copyButton);
        
        // Initial preview + selection highlight
        this._updateFontOrnaments();
        this._updatePreview();
    }
    
    _selectFont(key) {
        this._currentFont = key;
        this._settings.set_string('selected-font', key);
        this._updatePreview();
        // The menu stays open (itemActivated is intercepted in _buildUI)
    }
    
    _clearInput() {
        this._inputText = '';
        this._inputEntry.set_text('');
        this._updatePreview();
    }
    
    _updateFontOrnaments() {
        if (!this._fontItems) return;
        this._fontItems.forEach(({ key, item }) => {
            const selected = key === this._currentFont;
            item.setOrnament(
                selected
                    ? PopupMenu.Ornament.CHECK
                    : PopupMenu.Ornament.NONE
            );
            item.style = selected
                ? 'background-color: rgba(255,255,255,0.15); border-radius: 4px;'
                : '';
        });
    }
    
    _updatePreview() {
        const transformed = UnicodeMaps.transformText(this._inputText, this._currentFont);
        this._previewLabel.set_text(transformed);
    }
    
    _copyToClipboard() {
        const transformed = UnicodeMaps.transformText(this._inputText, this._currentFont);
        
        if (!transformed) {
            Main.notify('Unicode Font Converter', 'No text to copy');
            return;
        }
        
        // Copy to clipboard
        St.Clipboard.get_default().set_text(
            St.ClipboardType.CLIPBOARD,
            transformed
        );
        
        Main.notify('Unicode Font Converter', 'Text copied to clipboard!');
    }
    
    destroy() {
        if (this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }
        super.destroy();
    }
});

/**
 * Extension initialization
 */
function init() {
    log('Unicode Font Converter extension initialized');
}

/**
 * Extension enable
 */
function enable() {
    log('Enabling Unicode Font Converter extension');

    _ensureFontInstalled();

    unicodeFontIndicator = new UnicodeFontIndicator();
    Main.panel.addToStatusArea('unicode-font-converter', unicodeFontIndicator);
}

/**
 * Extension disable
 */
function disable() {
    log('Disabling Unicode Font Converter extension');
    
    if (unicodeFontIndicator) {
        unicodeFontIndicator.destroy();
        unicodeFontIndicator = null;
    }
}
