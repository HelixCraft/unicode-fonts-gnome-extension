#!/bin/bash
# Test for Unicode transformation logic - uses the real unicodeMaps.js

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cat > /tmp/test_unicode.js << EOF
// Test Unicode transformation using the real module
imports.searchPath.unshift('$PROJECT_DIR');

const { UnicodeMaps, transformText, getFontStyles } = imports.unicodeMaps;

let failed = 0;

function check(label, actual, expected) {
    if (actual === expected) {
        print("✓ " + label + " PASSED");
    } else {
        print("✗ " + label + " FAILED");
        print("  Expected: " + JSON.stringify(expected));
        print("  Actual:   " + JSON.stringify(actual));
        failed++;
    }
}

// Script test
const input = "Hello World 123";
const output = transformText(input, 'script');
check("Script", output, "ℋℯ𝓁𝓁ℴ 𝒲ℴ𝓇𝓁𝒹 123");

// Fraktur bug fix: B, C and I must be correct
check("Fraktur ABCI", transformText("ABCI", 'fraktur'), "𝔄𝔅ℭℑ");

// Circled digits
check("Circled digits", transformText("123", 'circled'), "①②③");

// Unsupported characters stay unchanged
check("Unsupported char", transformText("AäB", 'script'), "𝒜äℬ");

// Every style must have 26 upper, 26 lower and 10 digits
let stylesOk = true;
getFontStyles().forEach(style => {
    const map = UnicodeMaps[style.key];
    const counts = {
        upper: Array.from(map.upper).length,
        lower: Array.from(map.lower).length,
        digits: Array.from(map.digits).length
    };
    if (counts.upper !== 26 || counts.lower !== 26 || counts.digits !== 10) {
        print("✗ " + style.key + " lengths: upper=" + counts.upper +
              " lower=" + counts.lower + " digits=" + counts.digits);
        stylesOk = false;
        failed++;
    }
});
if (stylesOk) {
    print("✓ All " + getFontStyles().length + " styles have complete mappings");
}

print(failed === 0 ? "ALL TESTS PASSED" : (failed + " TEST(S) FAILED"));
EOF

gjs /tmp/test_unicode.js
