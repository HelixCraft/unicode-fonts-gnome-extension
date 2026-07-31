#!/bin/bash
# uninstall.sh - Remove the IBus Unicode Fonts input method
# Removes both the system-wide and the per-user installation.
# Run with sudo to remove the system-wide parts too.

set -euo pipefail

echo "Removing IBus Unicode Fonts ..."

# Per-user parts (no root needed)
USER_INSTALL_DIR="$HOME/.local/share/ibus-unicode-fonts"
rm -rf "$USER_INSTALL_DIR"
rm -f "$HOME/.local/share/ibus/component/unicode-fonts.xml"
rm -f "$HOME/.config/environment.d/60-ibus-unicode-fonts.conf"
if [ -d "$HOME/.local/share/glib-2.0/schemas" ]; then
    rm -f "$HOME/.local/share/glib-2.0/schemas/org.gnome.shell.extensions.unicode-font-converter.gschema.xml"
    glib-compile-schemas "$HOME/.local/share/glib-2.0/schemas" 2>/dev/null || true
fi

# System-wide parts (needs root)
if [ "$(id -u)" -eq 0 ]; then
    rm -rf /usr/share/ibus-unicode-fonts
    rm -f /usr/share/ibus/component/unicode-fonts.xml
    rm -f /usr/share/glib-2.0/schemas/org.gnome.shell.extensions.unicode-font-converter.gschema.xml
    glib-compile-schemas /usr/share/glib-2.0/schemas >/dev/null 2>&1 || true
else
    echo "Note: run with sudo to also remove the system-wide installation."
fi

echo "Removing input source from GNOME settings ..."
if command -v gsettings >/dev/null 2>&1; then
    python3 - <<'PYEOF' || true
import gi
gi.require_version('Gio', '2.0')
from gi.repository import Gio, GLib

settings = Gio.Settings.new('org.gnome.desktop.input-sources')
sources = [tuple(v) for v in settings.get_value('sources')]
sources = [s for s in sources if s != ('ibus', 'unicode-fonts')]
settings.set_value('sources', GLib.Variant('a(ss)', sources))
print("  input source removed")
PYEOF
fi

echo "Done. Log out and back in to complete the removal."
