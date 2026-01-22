// unicodeMaps.js - Unicode Font Mapping Tables
// Provides transformation functions for various Unicode font styles

/**
 * Base mapping tables for Unicode transformations
 * Each style maps A-Z, a-z, 0-9 to their Unicode equivalents
 */

const UnicodeMaps = {
    // Mathematical Script
    script: {
        upper: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
        lower: '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏',
        digits: '0123456789' // Script doesn't have special digits
    },
    
    // Mathematical Bold Script
    scriptBold: {
        upper: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
        lower: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃',
        digits: '0123456789'
    },
    
    // Mathematical Fraktur
    fraktur: {
        upper: '𝔄𝔅ℌ𝔇𝔈𝔉𝔊ℌ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
        lower: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷',
        digits: '0123456789'
    },
    
    // Mathematical Bold Fraktur
    frakturBold: {
        upper: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
        lower: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟',
        digits: '0123456789'
    },
    
    // Enclosed Alphanumerics - Circled
    circled: {
        upper: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
        lower: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
        digits: '⓪①②③④⑤⑥⑦⑧⑨'
    },
    
    // Enclosed Alphanumerics - Circled Inverted (Negative)
    circledInverted: {
        upper: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
        lower: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩', // Same as upper
        digits: '0⓵⓶⓷⓸⓹⓺⓻⓼⓽'
    },
    
    // Enclosed Alphanumerics - Squared
    squared: {
        upper: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
        lower: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉', // Same as upper
        digits: '0123456789'
    },
    
    // Enclosed Alphanumerics - Squared Inverted (Negative)
    squaredInverted: {
        upper: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
        lower: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉', // Same as upper
        digits: '0123456789'
    },
    
    // Small Capitals (Capitalized)
    capitalized: {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ',
        digits: '0123456789'
    },
    
    // Fullwidth (Full Width)
    fullWidth: {
        upper: 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
        lower: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
        digits: '０１２３４５６７８９'
    },
    
    // Mathematical Monospace
    monospace: {
        upper: '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉',
        lower: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣',
        digits: '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'
    },
    
    // Mathematical Sans-Serif
    sansSerif: {
        upper: '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹',
        lower: '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓',
        digits: '𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫'
    },
    
    // Mathematical Sans-Serif Italic
    sansSerifItalic: {
        upper: '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
        lower: '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻',
        digits: '𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫'
    },
    
    // Mathematical Sans-Serif Bold
    sansSerifBold: {
        upper: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
        lower: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇',
        digits: '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
    },
    
    // Mathematical Sans-Serif Bold Italic
    sansSerifBoldItalic: {
        upper: '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕',
        lower: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯',
        digits: '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
    }
};

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
    return [
        { key: 'script', name: 'Script' },
        { key: 'scriptBold', name: 'Script (Bold)' },
        { key: 'fraktur', name: 'Fraktur' },
        { key: 'frakturBold', name: 'Fraktur (Bold)' },
        { key: 'circled', name: 'Circled' },
        { key: 'circledInverted', name: 'Circled (Inverted)' },
        { key: 'squared', name: 'Squared' },
        { key: 'squaredInverted', name: 'Squared (Inverted)' },
        { key: 'capitalized', name: 'Capitalized' },
        { key: 'fullWidth', name: 'Full Width' },
        { key: 'monospace', name: 'Monospace' },
        { key: 'sansSerif', name: 'Sans-Serif' },
        { key: 'sansSerifItalic', name: 'Sans-Serif (Italic)' },
        { key: 'sansSerifBold', name: 'Sans-Serif (Bold)' },
        { key: 'sansSerifBoldItalic', name: 'Sans-Serif (Bold Italic)' }
    ];
}
