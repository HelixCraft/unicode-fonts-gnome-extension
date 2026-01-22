# IBus Unicode Fonts - Input Method Engine

Systemweite Unicode-Font-Transformation für GNOME.

## Beschreibung

Diese IBus Input Method Engine ermöglicht es, Tastatureingaben in Echtzeit in verschiedene Unicode-Schriftarten umzuwandeln. Sie arbeitet zusammen mit der GNOME Shell Extension "Unicode Font Converter".

## Voraussetzungen

- IBus (`sudo apt install ibus` auf Debian/Ubuntu)
- Python 3
- GObject Introspection für Python (`python3-gi`)
- GNOME Shell Extension "Unicode Font Converter" (für Schriftauswahl)

## Installation

```bash
sudo ./install.sh
```

Das Script:
1. Kopiert `engine.py` nach `/usr/share/ibus-unicode-fonts/`
2. Kopiert `unicode-fonts.xml` nach `/usr/share/ibus/component/`
3. Startet IBus neu

## Konfiguration

1. Öffne **GNOME Einstellungen** → **Tastatur** → **Eingabequellen**
2. Klicke **+** um eine neue Eingabequelle hinzuzufügen
3. Suche nach **"Unicode Fonts"**
4. Füge sie hinzu

## Nutzung

1. Wechsle zur "Unicode Fonts" Eingabequelle (z.B. `Super + Space`)
2. Wähle die gewünschte Schriftart in der GNOME Shell Extension
3. Tippe normal - Zeichen werden automatisch transformiert

## Architektur

Die Engine:
- Liest die aktuelle Schriftauswahl aus GSettings (`org.gnome.shell.extensions.unicode-font-converter`)
- Transformiert Tastatureingaben on-the-fly
- Nutzt die gleichen Unicode-Mapping-Tabellen wie die Extension

## Debugging

```bash
# Engine manuell starten
./engine.py

# IBus im Debug-Modus
ibus-daemon -xdr
```

## Deinstallation

```bash
sudo rm -rf /usr/share/ibus-unicode-fonts
sudo rm /usr/share/ibus/component/unicode-fonts.xml
ibus restart
```

## Lizenz

GPL
