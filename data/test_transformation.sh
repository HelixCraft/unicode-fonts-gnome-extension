#!/bin/bash
# Test for Unicode transformation logic

cat > /tmp/test_unicode.js << 'EOF'
// Test Unicode transformation

const maps = {
    script: {
        upper: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
        lower: '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏',
        digits: '0123456789'
    }
};

function transformChar(char, fontStyle) {
    const map = maps[fontStyle];
    if (!map) return char;
    
    const code = char.charCodeAt(0);
    
    if (code >= 65 && code <= 90) {
        const upperChars = Array.from(map.upper);
        return upperChars[code - 65] || char;
    }
    
    if (code >= 97 && code <= 122) {
        const lowerChars = Array.from(map.lower);
        return lowerChars[code - 97] || char;
    }
    
    if (code >= 48 && code <= 57) {
        const digitChars = Array.from(map.digits);
        return digitChars[code - 48] || char;
    }
    
    return char;
}

function transformText(text, fontStyle) {
    return Array.from(text).map(char => transformChar(char, fontStyle)).join('');
}

// Test
const input = "Hello World 123";
const output = transformText(input, 'script');
print("Input:  " + input);
print("Output: " + output);
print("Expected: ℋℯ𝓁𝓁ℴ 𝒲ℴ𝓇𝓁𝒹 123");
print(output === "ℋℯ𝓁𝓁ℴ 𝒲ℴ𝓇𝓁𝒹 123" ? "✓ TEST PASSED" : "✗ TEST FAILED");
EOF

gjs /tmp/test_unicode.js
