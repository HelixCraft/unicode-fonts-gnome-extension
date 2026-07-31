// unicodeMaps.js - Unicode Font Mapping Tables
// Provides transformation functions for various Unicode font styles
// Mapping data is loaded from the shared unicode-maps.json file

const { Gio, GLib } = imports.gi;

function _getDataPath() {
    try {
        const Me = imports.misc.extensionUtils.getCurrentExtension();
        if (Me && Me.dir) {
            return Me.dir.get_child('unicode-maps.json').get_path();
        }
    } catch (e) {
        // Not running inside GNOME Shell - fall through to CWD
    }
    return GLib.build_filenamev([GLib.get_current_dir(), 'unicode-maps.json']);
}

function _loadStyles() {
    const path = _getDataPath();
    const [ok, contents] = GLib.file_get_contents(path);
    if (!ok) {
        log(`Unicode Font Converter: could not read ${path}`);
        return [];
    }

    const data = JSON.parse(new TextDecoder().decode(contents));
    return data.styles || [];
}

const _styles = _loadStyles();

var UnicodeMaps = {};

_styles.forEach(style => {
    UnicodeMaps[style.key] = {
        upper: style.upper,
        lower: style.lower,
        digits: style.digits
    };
});

/**
 * Transform a single character using the specified font style
 * @param {string} char - Single character to transform
 * @param {string} fontStyle - Font style key from UnicodeMaps
 * @returns {string} Transformed character or original if not mappable
 */
function transformChar(char, fontStyle) {
    const map = UnicodeMaps[fontStyle];
    if (!map) return char;
    
    const code = char.charCodeAt(0);
    
    // Uppercase A-Z (65-90)
    if (code >= 65 && code <= 90) {
        const upperChars = Array.from(map.upper);
        return upperChars[code - 65] || char;
    }
    
    // Lowercase a-z (97-122)
    if (code >= 97 && code <= 122) {
        const lowerChars = Array.from(map.lower);
        return lowerChars[code - 97] || char;
    }
    
    // Digits 0-9 (48-57)
    if (code >= 48 && code <= 57) {
        const digitChars = Array.from(map.digits);
        return digitChars[code - 48] || char;
    }
    
    // Return unchanged for unsupported characters
    return char;
}

/**
 * Transform an entire string using the specified font style
 * @param {string} text - Text to transform
 * @param {string} fontStyle - Font style key from UnicodeMaps
 * @returns {string} Transformed text
 */
function transformText(text, fontStyle) {
    if (!text || !fontStyle) return text;
    
    return Array.from(text).map(char => transformChar(char, fontStyle)).join('');
}

/**
 * Get list of available font styles with display names
 * @returns {Array} Array of {key, name} objects
 */
function getFontStyles() {
    return _styles.map(style => ({ key: style.key, name: style.name }));
}
