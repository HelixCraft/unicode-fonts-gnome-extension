#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
IBus Unicode Font Converter Engine
Provides system-wide Unicode font transformation for text input
"""

import gi
gi.require_version('IBus', '1.0')
from gi.repository import IBus
from gi.repository import GLib
from gi.repository import Gio
from gi.repository import GObject

import sys
import os
import json

def _load_maps():
    """
    Load Unicode mapping tables from the shared unicode-maps.json.
    Looks next to the engine first (installed layout), then in the
    project root (development layout).
    """
    base = os.path.dirname(os.path.abspath(__file__))
    candidates = [
        os.path.join(base, 'unicode-maps.json'),
        os.path.join(base, os.pardir, 'unicode-maps.json'),
    ]
    for path in candidates:
        if os.path.isfile(path):
            with open(path, encoding='utf-8') as f:
                data = json.load(f)
            return {
                style['key']: {
                    'upper': style['upper'],
                    'lower': style['lower'],
                    'digits': style['digits'],
                }
                for style in data['styles']
            }
    print("Warning: unicode-maps.json not found. Engine will be a no-op.",
          file=sys.stderr)
    return {}

# Unicode mapping tables (shared source: ../unicode-maps.json)
UNICODE_MAPS = _load_maps()


class UnicodeFontEngine(IBus.Engine):
    """
    IBus Engine for Unicode Font Conversion
    Transforms keyboard input to Unicode font styles in real-time
    """
    
    def __init__(self):
        super(UnicodeFontEngine, self).__init__()
        self.settings = None
        self.current_font = 'script'
        self._load_settings()
        
    def _load_settings(self):
        """Load current font selection from GSettings"""
        try:
            self.settings = Gio.Settings.new('org.gnome.shell.extensions.unicode-font-converter')
            self.current_font = self.settings.get_string('selected-font')
            
            # Watch for changes
            self.settings.connect('changed::selected-font', self._on_font_changed)
        except Exception as e:
            print(f"Warning: Could not load settings: {e}", file=sys.stderr)
            print("Using default font: script", file=sys.stderr)
    
    def _on_font_changed(self, settings, key):
        """Handle font selection changes"""
        self.current_font = settings.get_string('selected-font')
        print(f"Font changed to: {self.current_font}", file=sys.stderr)
    
    def _transform_char(self, char):
        """Transform a single character using current font style"""
        font_map = UNICODE_MAPS.get(self.current_font)
        if not font_map:
            return char
        
        code = ord(char)
        
        # Uppercase A-Z (65-90)
        if 65 <= code <= 90:
            idx = code - 65
            upper_chars = list(font_map['upper'])
            if idx < len(upper_chars):
                return upper_chars[idx]
        
        # Lowercase a-z (97-122)
        elif 97 <= code <= 122:
            idx = code - 97
            lower_chars = list(font_map['lower'])
            if idx < len(lower_chars):
                return lower_chars[idx]
        
        # Digits 0-9 (48-57)
        elif 48 <= code <= 57:
            idx = code - 48
            digit_chars = list(font_map['digits'])
            if idx < len(digit_chars):
                return digit_chars[idx]
        
        # Return unchanged for unsupported characters
        return char
    
    def do_process_key_event(self, keyval, keycode, state):
        """
        Process keyboard events and transform characters
        Returns True if event was handled, False otherwise
        """
        # Ignore key release events
        is_press = ((state & IBus.ModifierType.RELEASE_MASK) == 0)
        if not is_press:
            return False
        
        # Ignore modifier keys
        if state & (IBus.ModifierType.CONTROL_MASK | IBus.ModifierType.MOD1_MASK):
            return False
        
        # Get character from keyval
        try:
            char = chr(keyval)
        except (ValueError, OverflowError):
            return False
        
        # Only transform alphanumeric characters
        if not (char.isalpha() or char.isdigit()):
            return False
        
        # Transform and commit
        transformed = self._transform_char(char)
        self.commit_text(IBus.Text.new_from_string(transformed))
        
        return True


class IMApp:
    """IBus Input Method Application"""
    
    def __init__(self, exec_by_ibus):
        self.mainloop = GLib.MainLoop()
        self.bus = IBus.Bus()
        self.bus.connect("disconnected", self.bus_disconnected_cb)
        self.factory = IBus.Factory.new(self.bus.get_connection())
        self.factory.add_engine("unicode-fonts", UnicodeFontEngine.__gtype__)
        
        if exec_by_ibus:
            self.bus.request_name("org.freedesktop.IBus.UnicodeFonts", 0)
        else:
            component = IBus.Component.new(
                "org.freedesktop.IBus.UnicodeFonts",
                "Unicode Font Converter",
                "1.0.0",
                "GPL",
                "Your Name",
                "https://github.com/yourusername/unicode-font-converter",
                "/usr/bin/exec",
                "ibus-unicode-fonts"
            )
            
            engine = IBus.EngineDesc.new(
                "unicode-fonts",
                "Unicode Fonts",
                "Unicode Font Converter Input Method",
                "en",
                "GPL",
                "Your Name",
                "",
                "default"
            )
            
            component.add_engine(engine)
            self.bus.register_component(component)
    
    def run(self):
        """Run the main loop"""
        self.mainloop.run()
    
    def bus_disconnected_cb(self, bus):
        """Handle bus disconnection"""
        self.mainloop.quit()


def main():
    """Main entry point"""
    IBus.init()
    
    # Check if executed by IBus daemon
    exec_by_ibus = len(sys.argv) > 1 and sys.argv[1] == "--ibus"
    
    app = IMApp(exec_by_ibus)
    app.run()


if __name__ == "__main__":
    main()
