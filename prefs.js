// prefs.js - Preferences for Unicode Font Converter
// Simple preferences UI for GNOME 43

const { Gtk, Gio } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {
}

function buildPrefsWidget() {
    let settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.unicode-font-converter');
    
    // Create main container
    let prefsWidget = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 10,
        margin_top: 20,
        margin_bottom: 20,
        margin_start: 20,
        margin_end: 20
    });
    
    // Title
    let title = new Gtk.Label({
        label: '<b>Unicode Font Converter Settings</b>',
        use_markup: true,
        halign: Gtk.Align.START
    });
    prefsWidget.append(title);
    
    // Info label
    let info = new Gtk.Label({
        label: 'The selected font style is automatically saved and restored when you reopen the extension.',
        wrap: true,
        halign: Gtk.Align.START
    });
    prefsWidget.append(info);
    
    // Current font display
    let currentFontBox = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 10
    });
    
    let currentFontLabel = new Gtk.Label({
        label: 'Current Font Style:',
        halign: Gtk.Align.START
    });
    currentFontBox.append(currentFontLabel);
    
    let currentFontValue = new Gtk.Label({
        label: settings.get_string('selected-font'),
        halign: Gtk.Align.START
    });
    currentFontBox.append(currentFontValue);
    
    prefsWidget.append(currentFontBox);
    
    // Update label when setting changes
    settings.connect('changed::selected-font', () => {
        currentFontValue.set_label(settings.get_string('selected-font'));
    });
    
    return prefsWidget;
}
