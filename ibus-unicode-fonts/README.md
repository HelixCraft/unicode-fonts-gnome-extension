# IBus Unicode Fonts - Input Method Engine

Systemweite Unicode-Font-Transformation für GNOME.

## Beschreibung

Diese IBus Input Method Engine wandelt Tastatureingaben in Echtzeit in verschiedene Unicode-Schriftarten um. Sie arbeitet zusammen mit der GNOME Shell Extension "Unicode Font Converter".

## Voraussetzungen

- IBus (`sudo apt install ibus` auf Debian/Ubuntu)
- Python 3
- GObject Introspection für Python (`python3-gi`)
- GNOME Shell Extension "Unicode Font Converter" (für die Schriftauswahl)

## Installation

```bash
./install.sh
```

- **Ohne `sudo`** installiert das Skript alles per-User nach `~/.local/share/` – kein Root nötig.
- **Mit `sudo`** installiert es systemweit nach `/usr/share/`.
- Das Skript funktioniert von jedem Verzeichnis aus und macht alles automatisch:
  1. Kopiert `engine.py` + `unicode-maps.json` in das Zielverzeichnis
  2. Erzeugt die IBus-Komponenten-Definition (`unicode-fonts.xml.in` → `unicode-fonts.xml`)
  3. Installiert und kompiliert das GSettings-Schema (die Engine liest darüber die Schriftauswahl)
  4. Registriert die Eingabequelle "Unicode Fonts" in den GNOME-Tastatureinstellungen
  5. Prüft die Engine auf Syntaxfehler

Wichtig: IBus 1.5 scannt per-User-Komponenten in `~/.local/share/ibus/component/` nicht von
sich aus (im IBus-Quellcode abgeschaltet). Deshalb setzt das Skript im per-User-Modus
`IBUS_COMPONENT_PATH` über `~/.config/environment.d/60-ibus-unicode-fonts.conf` – das gilt
erst ab dem nächsten Login.

Danach **aus- und wieder einloggen** (damit die Session IBus mit der Umgebungsvariable neu
startet), dann:

```bash
# optional: Eingabequelle beim nächsten Start sofort umschalten
Super + Space  # und "Unicode Fonts" wählen
```

Tipp: `./install.sh --restart` startet IBus sofort neu (dann ist kein Re-Login nötig).

## Konfiguration

Die Engine wird automatisch als Eingabequelle registriert. Falls nicht, manuell:
1. **GNOME Einstellungen** → **Tastatur** → **Eingabequellen**
2. **+** → nach **"Unicode Fonts"** suchen → hinzufügen

## Nutzung

1. Wechsle zur "Unicode Fonts" Eingabequelle (`Super + Space`)
2. Wähle die gewünschte Schriftart in der GNOME Shell Extension
3. Tippe normal - Zeichen werden automatisch transformiert

## Architektur

Die Engine:
- Liest die aktuelle Schriftauswahl aus GSettings (`org.gnome.shell.extensions.unicode-font-converter`)
- Transformiert Tastatureingaben on-the-fly
- Nutzt die gleichen Unicode-Mapping-Tabellen (`unicode-maps.json`) wie die Extension

## Debugging

```bash
# Engine manuell starten (registriert sich selbst am laufenden IBus)
python3 engine.py

# IBus im Debug-Modus
ibus-daemon -xdr

# Registrierte Engines anzeigen
ibus list-engine | grep unicode-fonts
```

## Deinstallation

```bash
./uninstall.sh          # entfernt die per-User Installation
sudo ./uninstall.sh     # entfernt zusätzlich die systemweite Installation
```

Danach aus- und wieder einloggen.

## Lizenz

GPL
