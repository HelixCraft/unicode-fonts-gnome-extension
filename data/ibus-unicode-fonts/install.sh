#!/bin/bash
# Installation script for IBus Unicode Fonts Input Method

set -e

echo "Installing IBus Unicode Fonts Input Method..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Create installation directory
INSTALL_DIR="/usr/share/ibus-unicode-fonts"
mkdir -p "$INSTALL_DIR"

# Copy engine
echo "Installing engine..."
cp engine.py "$INSTALL_DIR/"
chmod +x "$INSTALL_DIR/engine.py"

# Copy component definition
echo "Installing component definition..."
cp unicode-fonts.xml /usr/share/ibus/component/

# Restart IBus
echo "Restarting IBus..."
if pgrep -x "ibus-daemon" > /dev/null; then
    killall ibus-daemon
    sleep 1
fi

# Start IBus in the background
ibus-daemon -drx &

echo ""
echo "Installation complete!"
echo ""
echo "To use the Unicode Fonts input method:"
echo "1. Open GNOME Settings → Keyboard → Input Sources"
echo "2. Click '+' to add a new input source"
echo "3. Search for 'Unicode Fonts' and add it"
echo "4. Switch to the Unicode Fonts input source when you want to type in Unicode fonts"
echo "5. The font style is controlled by the GNOME Shell Extension"
echo ""
echo "Note: Make sure the Unicode Font Converter GNOME Shell Extension is installed and enabled."
