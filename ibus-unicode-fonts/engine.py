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

import sys
import os

# Unicode mapping tables (same as in unicodeMaps.js)
UNICODE_MAPS = {
    'script': {
        'upper': '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
        'lower': '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏',
        'digits': '0123456789'
    },
    'scriptBold': {
        'upper': '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
        'lower': '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃',
        'digits': '0123456789'
    },
    'fraktur': {
        'upper': '𝔄𝔅ℌ𝔇𝔈𝔉𝔊ℌ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
        'lower': '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷',
        'digits': '0123456789'
    },
    'frakturBold': {
        'upper': '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
        'lower': '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟',
        'digits': '0123456789'
    },
    'circled': {
        'upper': 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
        'lower': 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
        'digits': '⓪①②③④⑤⑥⑦⑧⑨'
    },
    'circledInverted': {
        'upper': '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
        'lower': '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
        'digits': '0⓵⓶⓷⓸⓹⓺⓻⓼⓽'
    },
    'squared': {
        'upper': '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
        'lower': '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
        'digits': '0123456789'
    },
    'squaredInverted': {
        'upper': '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
        'lower': '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
        'digits': '0123456789'
    },
    'capitalized': {
        'upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'lower': 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ',
        'digits': '0123456789'
    },
    'fullWidth': {
        'upper': 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
        'lower': 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
        'digits': '０１２３４５６７８９'
    },
    'monospace': {
        'upper': '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉',
        'lower': '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣',
        'digits': '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'
    },
    'sansSerif': {
        'upper': '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹',
        'lower': '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓',
        'digits': '𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫'
    },
    'sansSerifItalic': {
        'upper': '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
        'lower': '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻',
        'digits': '𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫'
    },
    'sansSerifBold': {
        'upper': '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
        'lower': '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇',
        'digits': '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
    },
    'sansSerifBoldItalic': {
        'upper': '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕',
        'lower': '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯',
        'digits': '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
    }
}


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
        self.factory.add_engine("unicode-fonts", 
                                GLib.GType.from_name("UnicodeFontEngine"))
        
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
