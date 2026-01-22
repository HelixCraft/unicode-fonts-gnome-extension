// extension.js - Main GNOME Shell Extension
// Unicode Font Converter for GNOME 43

const { St, Clutter, Gio, GObject } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

// Import Unicode mapping functions
const UnicodeMaps = Me.imports.unicodeMaps;

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
        
        // Create panel icon
        let icon = new St.Icon({
            icon_name: 'accessories-character-map-symbolic',
            style_class: 'system-status-icon'
        });
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
            this._updatePreview();
        });
    }
    
    _buildUI() {
        // Font selection section
        let fontSection = new PopupMenu.PopupMenuSection();
        this.menu.addMenuItem(fontSection);
        
        // Font selector label
        let fontLabel = new PopupMenu.PopupMenuItem('Font Style:', { reactive: false });
        fontLabel.label.style = 'font-weight: bold;';
        fontSection.addMenuItem(fontLabel);
        
        // Font style buttons
        const fontStyles = UnicodeMaps.getFontStyles();
        fontStyles.forEach(style => {
            let item = new PopupMenu.PopupMenuItem(style.name);
            item.connect('activate', () => {
                this._currentFont = style.key;
                this._settings.set_string('selected-font', style.key);
                this._updatePreview();
            });
            fontSection.addMenuItem(item);
        });
        
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        
        // Input section
        let inputSection = new PopupMenu.PopupMenuSection();
        this.menu.addMenuItem(inputSection);
        
        // Input label
        let inputLabel = new PopupMenu.PopupMenuItem('Input Text:', { reactive: false });
        inputLabel.label.style = 'font-weight: bold;';
        inputSection.addMenuItem(inputLabel);
        
        // Create input field container
        let inputItem = new PopupMenu.PopupBaseMenuItem({ reactive: false });
        
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
        
        inputItem.add_child(this._inputEntry);
        inputSection.addMenuItem(inputItem);
        
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        
        // Preview section
        let previewSection = new PopupMenu.PopupMenuSection();
        this.menu.addMenuItem(previewSection);
        
        // Preview label
        let previewLabel = new PopupMenu.PopupMenuItem('Preview:', { reactive: false });
        previewLabel.label.style = 'font-weight: bold;';
        previewSection.addMenuItem(previewLabel);
        
        // Preview text
        let previewItem = new PopupMenu.PopupBaseMenuItem({ reactive: false });
        
        this._previewLabel = new St.Label({
            text: '',
            style_class: 'unicode-preview-label',
            x_expand: true
        });
        this._previewLabel.clutter_text.set_line_wrap(true);
        this._previewLabel.clutter_text.set_line_wrap_mode(imports.gi.Pango.WrapMode.WORD_CHAR);
        
        previewItem.add_child(this._previewLabel);
        previewSection.addMenuItem(previewItem);
        
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        
        // Copy button
        let copyButton = new PopupMenu.PopupMenuItem('📋 Copy to Clipboard');
        copyButton.connect('activate', () => {
            this._copyToClipboard();
        });
        this.menu.addMenuItem(copyButton);
        
        // Initial preview update
        this._updatePreview();
    }
    
    _updatePreview() {
        const transformed = UnicodeMaps.transformText(this._inputText, this._currentFont);
        this._previewLabel.set_text(transformed || '(preview will appear here)');
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
