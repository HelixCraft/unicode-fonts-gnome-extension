#!/bin/bash
# Verification script for Unicode Font Converter Extension
# Works from any location - resolves paths relative to this script

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IBUS_DIR="$PROJECT_DIR/ibus-unicode-fonts"

echo "=== Unicode Font Converter - Verification Script ==="
echo "Project directory: $PROJECT_DIR"
echo ""

# Check GJS syntax
check_gjs_syntax() {
    gjs -c "const { GLib } = imports.gi;
const [ok, bytes] = GLib.file_get_contents('$1');
if (!ok) { throw new Error('Could not read $1'); }
new Function(new TextDecoder().decode(bytes));
print('syntax OK');"
}

echo "1. Checking extension.js syntax..."
if check_gjs_syntax "$PROJECT_DIR/extension.js" 2>/dev/null; then
    echo "   ✓ extension.js syntax OK"
else
    echo "   ✗ extension.js has syntax errors"
    check_gjs_syntax "$PROJECT_DIR/extension.js"
fi

echo ""
echo "2. Checking unicodeMaps.js syntax..."
if check_gjs_syntax "$PROJECT_DIR/unicodeMaps.js" 2>/dev/null; then
    echo "   ✓ unicodeMaps.js syntax OK"
else
    echo "   ✗ unicodeMaps.js has syntax errors"
    check_gjs_syntax "$PROJECT_DIR/unicodeMaps.js"
fi

echo ""
echo "3. Checking prefs.js syntax..."
if check_gjs_syntax "$PROJECT_DIR/prefs.js" 2>/dev/null; then
    echo "   ✓ prefs.js syntax OK"
else
    echo "   ✗ prefs.js has syntax errors"
    check_gjs_syntax "$PROJECT_DIR/prefs.js"
fi

echo ""
echo "4. Checking metadata.json..."
if python3 -m json.tool "$PROJECT_DIR/metadata.json" > /dev/null 2>&1; then
    echo "   ✓ metadata.json is valid JSON"
else
    echo "   ✗ metadata.json is invalid"
fi

echo ""
echo "5. Checking unicode-maps.json..."
if python3 -m json.tool "$PROJECT_DIR/unicode-maps.json" > /dev/null 2>&1; then
    echo "   ✓ unicode-maps.json is valid JSON"
else
    echo "   ✗ unicode-maps.json is invalid"
fi

echo ""
echo "6. Checking GSettings schema..."
if [ -f "$PROJECT_DIR/schemas/org.gnome.shell.extensions.unicode-font-converter.gschema.xml" ]; then
    echo "   ✓ GSettings schema file exists"
    
    # Try to compile schema
    if glib-compile-schemas "$PROJECT_DIR/schemas/" 2>/dev/null; then
        echo "   ✓ GSettings schema compiles successfully"
    else
        echo "   ✗ GSettings schema has errors"
        glib-compile-schemas "$PROJECT_DIR/schemas/"
    fi
else
    echo "   ✗ GSettings schema file not found"
fi

echo ""
echo "7. Checking file structure..."
required_files=(
    "extension.js"
    "unicodeMaps.js"
    "prefs.js"
    "metadata.json"
    "unicode-maps.json"
    "stylesheet.css"
    "schemas/org.gnome.shell.extensions.unicode-font-converter.gschema.xml"
)

all_present=true
for file in "${required_files[@]}"; do
    if [ -f "$PROJECT_DIR/$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ✗ $file missing"
        all_present=false
    fi
done

echo ""
echo "8. Checking IBus engine..."
if [ -f "$IBUS_DIR/engine.py" ]; then
    echo "   ✓ engine.py exists"
    
    # Check Python syntax
    if python3 -m py_compile "$IBUS_DIR/engine.py" 2>/dev/null; then
        echo "   ✓ engine.py syntax OK"
    else
        echo "   ✗ engine.py has syntax errors"
    fi
else
    echo "   ✗ engine.py not found"
fi

if [ -f "$IBUS_DIR/unicode-fonts.xml" ]; then
    echo "   ✓ unicode-fonts.xml exists"
else
    echo "   ✗ unicode-fonts.xml not found"
fi

if [ -f "$IBUS_DIR/install.sh" ] && [ -x "$IBUS_DIR/install.sh" ]; then
    echo "   ✓ install.sh exists and is executable"
else
    echo "   ✗ install.sh missing or not executable"
fi

echo ""
echo "=== Verification Complete ==="
echo ""
echo "Next steps:"
echo "1. Install the GNOME Shell Extension:"
echo "   cd $PROJECT_DIR"
echo "   glib-compile-schemas schemas/"
echo "   mkdir -p ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome"
echo "   cp -r * ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome/"
echo "   gnome-extensions enable unicode-font-converter@gnome"
echo ""
echo "2. Reload GNOME Shell:"
echo "   Press Alt+F2, type 'r', press Enter"
echo ""
echo "3. (Optional) Install IBus engine:"
echo "   cd $IBUS_DIR"
echo "   sudo ./install.sh"
