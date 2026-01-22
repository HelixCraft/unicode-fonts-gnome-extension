# Unicode Font Converter für GNOME

Ein vollständiges System zur Umwandlung von Text in verschiedene Unicode-Schriftarten, bestehend aus einer **GNOME Shell Extension** und einer optionalen **IBus Input Method Engine**.

## Features

### GNOME Shell Extension
- ✅ **15 Unicode-Schriftarten**: Script, Fraktur, Circled, Squared, Sans-Serif und mehr
- ✅ **Panel-Icon**: Schneller Zugriff über die Top-Bar
- ✅ **Live-Preview**: Sofortige Vorschau der Transformation
- ✅ **Clipboard-Integration**: Ein Klick zum Kopieren
- ✅ **Persistente Auswahl**: Schriftart wird automatisch gespeichert
- ✅ **Wayland-kompatibel**: Läuft stabil unter GNOME 43 + Wayland

### IBus Input Method Engine (Optional)
- ✅ **Systemweite Eingabe**: Funktioniert in jeder Anwendung
- ✅ **On-the-fly-Transformation**: Zeichen werden beim Tippen umgewandelt
- ✅ **Synchronisiert mit Extension**: Nutzt die gleiche Schriftauswahl

## Installation

### GNOME Shell Extension (Pflicht)

1. **Extension installieren:**
   ```bash
   cd unicode-font-converter
   
   # Schema kompilieren
   glib-compile-schemas schemas/
   
   # Extension installieren
   mkdir -p ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome
   cp -r * ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome/
   ```

2. **GNOME Shell neu laden:**
   - Drücke `Alt + F2`
   - Tippe `r` und drücke Enter
   - Oder logge dich aus und wieder ein

3. **Extension aktivieren:**
   ```bash
   gnome-extensions enable unicode-font-converter@gnome
   ```

   Alternativ über GNOME Extensions App.

### IBus Input Method Engine (Optional)

**Voraussetzungen:**
- IBus installiert (`sudo apt install ibus` auf Debian/Ubuntu)
- Python 3 mit GObject Introspection

**Installation:**
```bash
cd ibus-unicode-fonts
sudo ./install.sh
```

**Konfiguration:**
1. Öffne **GNOME Einstellungen** → **Tastatur** → **Eingabequellen**
2. Klicke auf **+** um eine neue Eingabequelle hinzuzufügen
3. Suche nach **"Unicode Fonts"** und füge sie hinzu
4. Wechsle zur Unicode Fonts Eingabequelle (z.B. mit `Super + Space`)

## Nutzung

### GNOME Shell Extension

1. **Klicke auf das Icon** in der Top-Bar (Zeichen-Tabellen-Symbol)
2. **Wähle eine Schriftart** aus dem Dropdown-Menü
3. **Tippe oder füge Text ein** im Eingabefeld
4. **Sieh die Live-Preview** der Transformation
5. **Klicke "Copy to Clipboard"** um den transformierten Text zu kopieren

**Beispiel:**
- Eingabe: `Hello World`
- Script: `ℋℯ𝓁𝓁ℴ 𝒲ℴ𝓇𝓁𝒹`
- Fraktur: `ℌ𝔢𝔩𝔩𝔬 𝔚𝔬𝔯𝔩𝔡`
- Circled: `Ⓗⓔⓛⓛⓞ Ⓦⓞⓡⓛⓓ`

### IBus Input Method

1. **Wechsle zur Unicode Fonts Eingabequelle** (z.B. `Super + Space`)
2. **Wähle die gewünschte Schriftart** in der GNOME Shell Extension
3. **Tippe normal** - Zeichen werden automatisch transformiert
4. **Wechsle zurück** zur normalen Tastatur für reguläre Eingabe

## Verfügbare Schriftarten

| Schriftart | Beispiel |
|------------|----------|
| Script | 𝒯𝓎𝓅ℯ ℴ𝓇 𝓅𝒶𝓈𝓉ℯ 𝓎ℴ𝓊𝓇 𝒸ℴ𝓃𝓉ℯ𝓃𝓉 𝒽ℯ𝓇ℯ |
| Script (Bold) | 𝓣𝔂𝓹𝓮 𝓸𝓻 𝓹𝓪𝓼𝓽𝓮 𝔂𝓸𝓾𝓻 𝓬𝓸𝓷𝓽𝓮𝓷𝓽 𝓱𝓮𝓻𝓮 |
| Fraktur | 𝔗𝔶𝔭𝔢 𝔬𝔯 𝔭𝔞𝔰𝔱𝔢 𝔶𝔬𝔲𝔯 𝔠𝔬𝔫𝔱𝔢𝔫𝔱 𝔥𝔢𝔯𝔢 |
| Fraktur (Bold) | 𝕿𝖞𝖕𝖊 𝖔𝖗 𝖕𝖆𝖘𝖙𝖊 𝖞𝖔𝖚𝖗 𝖈𝖔𝖓𝖙𝖊𝖓𝖙 𝖍𝖊𝖗𝖊 |
| Circled | Ⓣⓨⓟⓔ ⓞⓡ ⓟⓐⓢⓣⓔ ⓨⓞⓤⓡ ⓒⓞⓝⓣⓔⓝⓣ ⓗⓔⓡⓔ |
| Circled (Inverted) | 🅣🅨🅟🅔 🅞🅡 🅟🅐🅢🅣🅔 🅨🅞🅤🅡 🅒🅞🅝🅣🅔🅝🅣 🅗🅔🅡🅔 |
| Squared | 🅃🅈🄿🄴 🄾🅁 🄿🄰🅂🅃🄴 🅈🄾🅄🅁 🄲🄾🄽🅃🄴🄽🅃 🄷🄴🅁🄴 |
| Squared (Inverted) | 🆃🆈🅿🅴 🅾🆁 🅿🅰🆂🆃🅴 🆈🅾🆄🆁 🅲🅾🅽🆃🅴🅽🆃 🅷🅴🆁🅴 |
| Capitalized | Tʏᴘᴇ ᴏʀ ᴘᴀꜱᴛᴇ ʏᴏᴜʀ ᴄᴏɴᴛᴇɴᴛ ʜᴇʀᴇ |
| Full Width | Ｔｙｐｅ ｏｒ ｐａｓｔｅ ｙｏｕｒ ｃｏｎｔｅｎｔ ｈｅｒｅ |
| Monospace | 𝚃𝚢𝚙𝚎 𝚘𝚛 𝚙𝚊𝚜𝚝𝚎 𝚢𝚘𝚞𝚛 𝚌𝚘𝚗𝚝𝚎𝚗𝚝 𝚑𝚎𝚛𝚎 |
| Sans-Serif | 𝖳𝗒𝗉𝖾 𝗈𝗋 𝗉𝖺𝗌𝗍𝖾 𝗒𝗈𝗎𝗋 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗁𝖾𝗋𝖾 |
| Sans-Serif (Italic) | 𝘛𝘺𝘱𝘦 𝘰𝘳 𝘱𝘢𝘴𝘵𝘦 𝘺𝘰𝘶𝘳 𝘤𝘰𝘯𝘵𝘦𝘯𝘵 𝘩𝘦𝘳𝘦 |
| Sans-Serif (Bold) | 𝗧𝘆𝗽𝗲 𝗼𝗿 𝗽𝗮𝘀𝘁𝗲 𝘆𝗼𝘂𝗿 𝗰𝗼𝗻𝘁𝗲𝗻𝘁 𝗵𝗲𝗿𝗲 |
| Sans-Serif (Bold Italic) | 𝙏𝙮𝙥𝙚 𝙤𝙧 𝙥𝙖𝙨𝙩𝙚 𝙮𝙤𝙪𝙧 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙝𝙚𝙧𝙚 |

## Architektur & Wayland-Einschränkungen

### Warum diese Architektur?

Unter **Wayland** ist es aus Sicherheitsgründen **nicht möglich**, dass GNOME Shell Extensions direkt Tastatureingaben abfangen oder manipulieren. Dies ist eine bewusste Design-Entscheidung von Wayland, um Keylogging und andere Sicherheitsrisiken zu verhindern.

### Lösung: Zwei-Komponenten-System

1. **GNOME Shell Extension**:
   - Bietet UI für Schriftauswahl und Copy/Paste-Workflow
   - Speichert Schriftauswahl in GSettings
   - Funktioniert eigenständig für manuelle Transformation

2. **IBus Input Method Engine** (optional):
   - Läuft als separater Prozess außerhalb der Shell
   - Hat legitimen Zugriff auf Tastatureingaben (wie jede andere Input Method)
   - Liest Schriftauswahl aus GSettings
   - Transformiert Zeichen in Echtzeit

### Kommunikation

```
┌─────────────────────────┐
│  GNOME Shell Extension  │
│  (UI + Schriftauswahl)  │
└───────────┬─────────────┘
            │
            │ GSettings
            │ (selected-font)
            │
            ▼
┌─────────────────────────┐
│   IBus Engine (Python)  │
│  (Tastatur-Transform.)  │
└─────────────────────────┘
```

## Technische Details

### Unicode-Transformation

Die Transformation erfolgt über **Mapping-Tabellen**, nicht über Fonts:
- Jeder Buchstabe wird auf sein Unicode-Äquivalent gemappt
- Beispiel: `A` → `𝒜` (U+1D49C, Mathematical Script Capital A)
- Nicht unterstützte Zeichen bleiben unverändert
- Keine Abstürze bei Emojis, Umlauten oder Sonderzeichen

### Persistenz

Die Schriftauswahl wird in **GSettings** gespeichert:
- Schema: `org.gnome.shell.extensions.unicode-font-converter`
- Key: `selected-font`
- Wird automatisch beim Öffnen wiederhergestellt

## Testen

### Extension-Syntax prüfen
```bash
cd unicode-font-converter
gjs -c extension.js
```

### Extension-Log anzeigen
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

### IBus-Engine testen
```bash
# Engine manuell starten (Debug-Modus)
cd ibus-unicode-fonts
./engine.py
```

## Deinstallation

### GNOME Shell Extension
```bash
gnome-extensions disable unicode-font-converter@gnome
rm -rf ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome
```

### IBus Engine
```bash
sudo rm -rf /usr/share/ibus-unicode-fonts
sudo rm /usr/share/ibus/component/unicode-fonts.xml
ibus restart
```

## Troubleshooting

### Extension erscheint nicht in der Top-Bar
- Prüfe, ob Extension aktiviert ist: `gnome-extensions list`
- Schaue ins Log: `journalctl -f -o cat /usr/bin/gnome-shell`
- GNOME Shell neu laden: `Alt + F2`, dann `r`

### IBus Engine erscheint nicht in Eingabequellen
- Prüfe Installation: `ls /usr/share/ibus/component/unicode-fonts.xml`
- IBus neu starten: `ibus restart`
- Prüfe IBus-Log: `ibus-daemon -xdr`

### Transformation funktioniert nicht
- Prüfe, ob GSettings-Schema kompiliert wurde
- Prüfe aktuelle Schriftauswahl: `gsettings get org.gnome.shell.extensions.unicode-font-converter selected-font`

## Lizenz

GPL (wie in den Metadaten angegeben)

## Autor

Dein Name / GitHub-Username

## Beiträge

Pull Requests sind willkommen! Bitte öffne zuerst ein Issue für größere Änderungen.
