#!/bin/bash
# install.sh - Installer for the IBus Unicode Fonts Input Method
#
# Works without root (installs into ~/.local, per-user) and with root/sudo
# (installs system-wide). Run from any directory.
#
# Usage: ./install.sh [--restart]

set -euo pipefail

# Resolve this script's own directory (works no matter where you call it from)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

SCHEMA_NAME="org.gnome.shell.extensions.unicode-font-converter.gschema.xml"
SCHEMA_SRC="$PROJECT_DIR/schemas/$SCHEMA_NAME"

RESTART_IBUS=0
case "${1:-}" in
    --restart) RESTART_IBUS=1 ;;
    -h|--help)
        echo "Usage: $0 [--restart]"
        echo "  --restart   restart the user's ibus-daemon afterwards"
        exit 0
        ;;
    "")
        ;;
    *)
        echo "Unknown option: $1" >&2
        echo "Usage: $0 [--restart]" >&2
        exit 1
        ;;
esac

# Choose install target: system-wide when run as root, per-user otherwise.
if [ "$(id -u)" -eq 0 ]; then
    INSTALL_DIR="/usr/share/ibus-unicode-fonts"
    COMPONENT_DIR="/usr/share/ibus/component"
    SCHEMA_DIR="/usr/share/glib-2.0/schemas"
    TARGET_LABEL="system-wide ($INSTALL_DIR)"
else
    INSTALL_DIR="$HOME/.local/share/ibus-unicode-fonts"
    COMPONENT_DIR="$HOME/.local/share/ibus/component"
    SCHEMA_DIR="$HOME/.local/share/glib-2.0/schemas"
    TARGET_LABEL="per-user ($INSTALL_DIR)"
fi

# Dependency checks
for cmd in python3 glib-compile-schemas install; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Error: required command not found: $cmd" >&2
        exit 1
    fi
done
if ! python3 -c "import gi" >/dev/null 2>&1; then
    echo "Error: python3-gi (GObject Introspection for Python) is missing." >&2
    echo "  Install it e.g. with: sudo apt install python3-gi" >&2
    exit 1
fi

echo "Installing IBus Unicode Fonts ($TARGET_LABEL)"

mkdir -p "$INSTALL_DIR" "$COMPONENT_DIR" "$SCHEMA_DIR"

echo "  engine.py + unicode-maps.json -> $INSTALL_DIR"
install -m 755 "$SCRIPT_DIR/engine.py" "$INSTALL_DIR/engine.py"
install -m 644 "$PROJECT_DIR/unicode-maps.json" "$INSTALL_DIR/unicode-maps.json"

echo "  component definition -> $COMPONENT_DIR"
sed "s|@ENGINE_DIR@|$INSTALL_DIR|g" \
    "$SCRIPT_DIR/unicode-fonts.xml.in" > "$COMPONENT_DIR/unicode-fonts.xml"

# In per-user mode IBus (1.5.x) does not scan ~/.local/share/ibus/component
# (disabled in its source with #if 0). Set IBUS_COMPONENT_PATH so the session
# ibus-daemon picks the engine up after the next login. Not needed system-wide.
if [ "$(id -u)" -ne 0 ]; then
    ENVD_FILE="$HOME/.config/environment.d/60-ibus-unicode-fonts.conf"
    mkdir -p "$(dirname "$ENVD_FILE")"
    printf 'IBUS_COMPONENT_PATH=/usr/share/ibus/component:%s\n' \
        "$COMPONENT_DIR" > "$ENVD_FILE"
    echo "  IBUS_COMPONENT_PATH -> $ENVD_FILE"
    # The ibus registry cache only tracks the paths recorded when it was
    # written. Drop it so the daemon re-scans and finds the new component
    # after the next login.
    rm -f "$HOME/.cache/ibus/bus/registry"
    echo "  cleared ibus registry cache"
fi

echo "  GSettings schema -> $SCHEMA_DIR"
install -m 644 "$SCHEMA_SRC" "$SCHEMA_DIR/$SCHEMA_NAME"
glib-compile-schemas "$SCHEMA_DIR" >/dev/null

echo "  verifying engine.py ..."
python3 -m py_compile "$INSTALL_DIR/engine.py"
rm -rf "$INSTALL_DIR/__pycache__"
echo "OK"

# Register the input source so it shows up as a selectable layout.
if command -v gsettings >/dev/null 2>&1; then
    python3 - <<'PYEOF'
import gi
gi.require_version('Gio', '2.0')
from gi.repository import Gio, GLib

settings = Gio.Settings.new('org.gnome.desktop.input-sources')
sources = [tuple(v) for v in settings.get_value('sources')]
if ('ibus', 'unicode-fonts') not in sources:
    sources.append(('ibus', 'unicode-fonts'))
    settings.set_value('sources', GLib.Variant('a(ss)', sources))
    print("  input source 'Unicode Fonts' added")
else:
    print("  input source 'Unicode Fonts' already present")
PYEOF
else
    echo "  (gsettings not found - add 'Unicode Fonts' manually in Settings → Keyboard)"
fi

if [ "$RESTART_IBUS" -eq 1 ] && command -v ibus >/dev/null 2>&1; then
    echo "  restarting ibus-daemon ..."
    ibus restart || true
else
    echo "  NOTE: log out and back in so the session restarts ibus-daemon"
fi

echo ""
echo "Installation complete!"
echo ""
echo "To use it:"
echo "  1. (Re)login if not done yet."
echo "  2. Press Super+Space and switch to the 'Unicode Fonts' input source."
echo "  3. Type - characters are transformed to the font selected in the"
echo "     GNOME Shell extension (top bar icon)."
echo ""
echo "Uninstall: ./uninstall.sh"
