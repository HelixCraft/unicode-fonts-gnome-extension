#!/bin/bash
# Verification script for Unicode Font Converter Extension

echo "=== Unicode Font Converter - Verification Script ==="
echo ""

# Check GJS syntax
echo "1. Checking extension.js syntax..."
cd /home/timon/.gemini/antigravity/scratch/unicode-font-converter
if gjs -c extension.js 2>/dev/null; then
    echo "   ✓ extension.js syntax OK"
else
    echo "   ✗ extension.js has syntax errors"
    gjs -c extension.js
fi

echo ""
echo "2. Checking unicodeMaps.js syntax..."
if gjs -c unicodeMaps.js 2>/dev/null; then
    echo "   ✓ unicodeMaps.js syntax OK"
else
    echo "   ✗ unicodeMaps.js has syntax errors"
    gjs -c unicodeMaps.js
fi

echo ""
echo "3. Checking prefs.js syntax..."
if gjs -c prefs.js 2>/dev/null; then
    echo "   ✓ prefs.js syntax OK"
else
    echo "   ✗ prefs.js has syntax errors"
    gjs -c prefs.js
fi

echo ""
echo "4. Checking metadata.json..."
if python3 -m json.tool metadata.json > /dev/null 2>&1; then
    echo "   ✓ metadata.json is valid JSON"
else
    echo "   ✗ metadata.json is invalid"
fi

echo ""
echo "5. Checking GSettings schema..."
if [ -f "schemas/org.gnome.shell.extensions.unicode-font-converter.gschema.xml" ]; then
    echo "   ✓ GSettings schema file exists"
    
    # Try to compile schema
    if glib-compile-schemas schemas/ 2>/dev/null; then
        echo "   ✓ GSettings schema compiles successfully"
    else
        echo "   ✗ GSettings schema has errors"
        glib-compile-schemas schemas/
    fi
else
    echo "   ✗ GSettings schema file not found"
fi

echo ""
echo "6. Checking file structure..."
required_files=(
    "extension.js"
    "unicodeMaps.js"
    "prefs.js"
    "metadata.json"
    "stylesheet.css"
    "schemas/org.gnome.shell.extensions.unicode-font-converter.gschema.xml"
)

all_present=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ✗ $file missing"
        all_present=false
    fi
done

echo ""
echo "7. Checking IBus engine..."
cd /home/timon/.gemini/antigravity/scratch/ibus-unicode-fonts
if [ -f "engine.py" ]; then
    echo "   ✓ engine.py exists"
    
    # Check Python syntax
    if python3 -m py_compile engine.py 2>/dev/null; then
        echo "   ✓ engine.py syntax OK"
    else
        echo "   ✗ engine.py has syntax errors"
    fi
else
    echo "   ✗ engine.py not found"
fi

if [ -f "unicode-fonts.xml" ]; then
    echo "   ✓ unicode-fonts.xml exists"
else
    echo "   ✗ unicode-fonts.xml not found"
fi

if [ -f "install.sh" ] && [ -x "install.sh" ]; then
    echo "   ✓ install.sh exists and is executable"
else
    echo "   ✗ install.sh missing or not executable"
fi

echo ""
echo "=== Verification Complete ==="
echo ""
echo "Next steps:"
echo "1. Install the GNOME Shell Extension:"
echo "   cd /home/timon/.gemini/antigravity/scratch/unicode-font-converter"
echo "   glib-compile-schemas schemas/"
echo "   mkdir -p ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome"
echo "   cp -r * ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome/"
echo "   gnome-extensions enable unicode-font-converter@gnome"
echo ""
echo "2. Reload GNOME Shell:"
echo "   Press Alt+F2, type 'r', press Enter"
echo ""
echo "3. (Optional) Install IBus engine:"
echo "   cd /home/timon/.gemini/antigravity/scratch/ibus-unicode-fonts"
echo "   sudo ./install.sh"
