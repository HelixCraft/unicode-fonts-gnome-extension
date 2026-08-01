# Unicode Font Converter — Documentation

This document explains the **Unicode Font Converter** project. It is split into two parts:

- **Part 1** is written for regular users. It describes what the project does, how to use it, and what you can do with it — no technical knowledge required.
- **Part 2** goes a little deeper and explains some of the inner workings for anyone who wants to understand how the pieces fit together.

---

## Part 1 — For Users

### 1.1 What is this?

**Unicode Font Converter** is a tool for GNOME that turns normal text into "fancy" Unicode lettering. Instead of images or fonts that others might not have installed, it uses real Unicode characters, so the output works almost everywhere: chat apps, email, documents, social media, and more.

It consists of two components:

1. **GNOME Shell Extension** (required) — a small icon in the top bar that gives you a font picker, a text field with live preview, and one-click copy.
2. **IBus Input Method Engine** (optional) — lets you type *directly* in the fancy style in any application, without copying and pasting.

### 1.2 Features

#### The GNOME Shell Extension (required)

- **15 Unicode font styles**, including Script, Fraktur (Gothic), Circled, Squared, Sans-Serif (regular/italic/bold), Capitalized, Full Width, and Monospace.
- **Live preview** — type or paste your text and immediately see the transformed result before copying.
- **One-click copy** — press the "Copy to Clipboard" button or just press **Enter** to copy the converted text.
- **Persistent choice** — the font style you select is remembered, so the next time you open the extension it is already selected.
- **Automatic font handling** — if your system does not have a font with all the needed symbols, the extension installs one for you automatically and tells you to reload GNOME Shell.
- **Safe for any input** — emojis, umlauts, and other special characters are simply left unchanged; the tool never crashes or produces broken text.

#### The IBus Input Method Engine (optional)

- **System-wide typing** — works in *every* application, not just the extension's little text field.
- **On-the-fly transformation** — every letter and digit is converted as you type.
- **Synced with the extension** — it uses the exact same font style you pick in the top-bar extension, so your choice stays consistent everywhere.

### 1.3 How to use it

#### Using the GNOME Shell Extension

1. Click the **icon in the top bar** (looks like a character table / font symbol).
2. Choose a **font style** from the drop-down menu (e.g. "Fraktur" or "Circled").
3. **Type or paste** your text into the input field.
4. Look at the **live preview** — this is what the output will look like.
5. Click **"Copy to Clipboard"** or press **Enter** to copy the transformed text.
6. Paste it wherever you want.

All availabel fonts:

| Input    | Output                    | Style      |
|----------|---------------------------|------------|
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

#### Using the IBus Input Method (optional)

1. Switch to the **"Unicode Fonts"** input source (usually with **Super + Space**, or through Settings → Keyboard → Input Sources).
2. Pick the font style you want in the GNOME Shell extension (top-bar icon).
3. Just **type normally** — every alphanumeric character is converted as you type.
4. Switch back to your normal keyboard layout when you want regular text again.

### 1.4 What can you use it for? (Use cases)

- **Chat & messaging** — make your messages stand out with a decorative style.
- **Social media** — usernames, bios, and captions with a unique look.
- **Documents & notes** — headings or decorative accents, especially with styles like Fraktur or Capitalized.
- **Design & placeholders** — quickly generate styled sample text for mockups and previews.
- **Accessibility / visual distinction** — mark keywords visually without using color.
- **Text transformation in bulk** — paste a large amount of text, preview it, and copy it all at once.

### 1.5 Installation and removal (for users)

#### Installing the GNOME Shell Extension (required)

1. Compile the settings schema:

   ```bash
   cd unicode-font-converter
   glib-compile-schemas schemas/
   ```

2. Copy the extension into your user's extension folder:

   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome
   cp -r * ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome/
   ```

3. Reload GNOME Shell: press **Alt + F2**, type `r`, and press **Enter** (or log out and back in).

4. Enable the extension:

   ```bash
   gnome-extensions enable unicode-font-converter@gnome
   ```

   (You can also enable it in the GNOME Extensions app.)

#### Installing the IBus Input Method Engine (optional)

Make sure you have **IBus** (`sudo apt install ibus` on Debian/Ubuntu) and **Python 3** with GObject Introspection (`python3-gi`). Then:

```bash
cd ibus-unicode-fonts
./install.sh          # installs for your user only (no root needed)
# sudo ./install.sh   # installs system-wide for all users
```

The installer does everything automatically: it copies the engine and mapping data, registers the input source in GNOME, and compiles the settings schema. It runs from any directory.

Afterwards, **log out and back in** (or run `./install.sh --restart`) so the session picks up the new input source. Then switch to the **"Unicode Fonts"** input source with **Super + Space**.

#### Uninstalling the IBus Input Method Engine

```bash
cd ibus-unicode-fonts
./uninstall.sh        # removes your per-user installation
sudo ./uninstall.sh   # also removes the system-wide installation
```

Log out and back in to finish the removal.

#### Removing the GNOME Shell Extension

```bash
gnome-extensions disable unicode-font-converter@gnome
rm -rf ~/.local/share/gnome-shell/extensions/unicode-font-converter@gnome
```

---

## Part 2 — Deeper Look (for curious users and developers)

### 2.1 Why two components?

Under **Wayland**, GNOME Shell extensions are *not allowed* to intercept or manipulate keyboard input. That is a deliberate security decision by Wayland to prevent keyloggers and similar risks. An extension therefore cannot do real-time text transformation as you type.

That is why the project uses a **two-component design**:

- The **GNOME Shell Extension** handles the user interface: picking a style, entering text, previewing, and copying. This works fine under Wayland because it only interacts with the panel and the clipboard.
- The **IBus Input Method Engine** runs as a separate process *outside* the shell. Input methods are exactly the kind of software that legitimately receives keystrokes, so the engine is allowed to transform text in real time — in any application, on Wayland and X11 alike.

The two parts communicate through **GSettings** (a system configuration store): both read and write the same `selected-font` setting, so your choice in the extension is automatically used by the IBus engine and vice versa.

```
┌─────────────────────────┐
│  GNOME Shell Extension  │
│  (UI + font selection)  │
└───────────┬─────────────┘
            │  GSettings
            │  (selected-font)
            ▼
┌─────────────────────────┐
│   IBus Engine (Python)  │
│  (real-time typing)     │
└─────────────────────────┘
```

### 2.2 The IBus engine is an extra "keyboard language"

To the system, the IBus engine looks like an **additional input source** — similar to switching between, say, "English (US)" and "German". When you select "Unicode Fonts" as your input source, every application thinks you are typing in a special keyboard layout. The engine *commits* the transformed character instead of the raw key, which is why the conversion works in every program.

Key things to understand about this approach:

- The engine only reacts to **letter and digit keys**. Spaces, punctuation, arrows, shortcuts, and other keys pass through untouched.
- It also **ignores key combinations** with Ctrl or Alt, so shortcuts like **Ctrl+C** still work normally.
- The mapping is **per-character**: each letter is looked up in a table and replaced with its Unicode equivalent (for example, capital `A` becomes `𝒜`, the Mathematical Script Capital A, code point U+1D49C). Characters without a mapping are left as they are.
- Because the engine consumes the key event, the transformed character is inserted even while the "Unicode Fonts" layout is active — you do not have to type in a separate window.

### 2.3 How the transformation actually works

The conversion is done with **mapping tables**, not with fonts. The project ships a shared data file (`unicode-maps.json`) that is used by *both* the extension and the IBus engine, so the two can never drift apart.

For each of the 15 styles the table contains three strings:

- **upper** — the mapped versions of the 26 uppercase letters A–Z,
- **lower** — the mapped versions of the 26 lowercase letters a–z,
- **digits** — the mapped versions of the 10 digits 0–9.

Transforming text is then simply a matter of walking through the input one character at a time and swapping each letter/digit for its mapped counterpart. Everything else (umlauts, emojis, symbols) stays unchanged. This also means the tool is **deterministic**: the same input and style always produce the same output, and the output is pure Unicode text — no styling, colors, or formatting is lost or added.

### 2.4 How the styles work

- **Script / Script (Bold)** — Mathematical Script letters; an elegant, handwritten look.
- **Fraktur / Fraktur (Bold)** — Mathematical Fraktur letters; the classic Gothic style.
- **Circled** — letters and digits inside circles; the digit `0` becomes `⓪`, `1` becomes `①`, and so on.
- **Circled (Inverted)** — white letters inside filled circles (negative look); note that this style uses the same characters for upper- and lowercase.
- **Squared** — letters inside hollow squares; again case-insensitive.
- **Squared (Inverted)** — white letters inside filled squares; also case-insensitive.
- **Capitalized** — capital letters are kept as-is and lowercase letters become small caps (`ʀ` style), giving a "small caps" typographic look.
- **Full Width** — wide, monospaced-looking East-Asian-style characters.
- **Monospace** — Mathematical Monospace letters and digits.
- **Sans-Serif** — Mathematical Sans-Serif, plus **Italic**, **Bold**, and **Bold Italic** variants.

A few of these styles (the circled/squared ones) use the same glyph for upper- and lowercase, so case is lost when applying them. The others preserve case.

### 2.5 The bundled Symbola font

Most of these Unicode code points belong to the "Mathematical Alphanumeric Symbols" block, which is **not covered by typical system fonts**. To make sure the preview in the extension actually *shows* the symbols, the project bundles a free font (**Symbola**, by George Douros — free for any use, including redistribution) in `data/fonts/`.

When the extension starts, it checks whether your system already has a font that can render the needed glyphs:

- If yes, nothing happens and the bundled font is not installed.
- If no, the extension copies the font into your user fonts directory (`~/.local/share/fonts/unicode-font-converter/`) and refreshes the font cache, then asks you to reload GNOME Shell once so the font becomes visible.

The font is only used for **rendering/preview**; the transformed output is pure Unicode text and displays correctly anywhere that has any font covering those code points.

### 2.6 The installer in more detail

The modern `ibus-unicode-fonts/install.sh` works from any directory and needs no special setup:

- It detects whether you are root. **As a normal user** it installs everything under `~/.local/share/` (your account only). **With `sudo`** it installs system-wide under `/usr/share/`.
- It copies the engine and the shared mapping data to the installation directory.
- It generates the IBus component file (`unicode-fonts.xml`) from a template.
- It installs and compiles the GSettings schema.
- It adds the "Unicode Fonts" input source to your GNOME input-sources list.
- It verifies the engine's Python syntax before finishing.

One subtlety: IBus 1.5 does **not** scan per-user component directories (`~/.local/share/ibus/component/`) on its own — this is disabled in IBus's source code. For per-user installations the installer therefore sets the environment variable `IBUS_COMPONENT_PATH` through `~/.config/environment.d/`, which the session reads at the next login. This is why a re-login (or `--restart`) is needed after installation.

There is an **older, simpler installer** under `data/ibus-unicode-fonts/install.sh`. It requires root and only does a system-wide install with a hardcoded path; it is kept for reference but the `ibus-unicode-fonts/install.sh` script is the recommended one.

### 2.7 Changing the font style dynamically

Both the extension and the IBus engine subscribe to changes of the `selected-font` setting:

- When you pick a style in the top-bar menu, the extension writes it to GSettings.
- The IBus engine watches that setting and updates its internal style **immediately** — no restart needed. The style change applies the next time you type.

### 2.8 Limitations and things to know

- **Case is lost** in the circled/squared (and inverted) styles, because Unicode simply has no case variants for those letters.
- **Only basic Latin letters and digits** are transformed (A–Z, a–z, 0–9). Accented letters, Greek, Cyrillic, and other scripts pass through unchanged.
- **No formatting**: the output is plain text. Bold *looks* bold because of the Unicode glyphs, but it is not real text formatting.
- **Font support depends on the target device**: if a recipient's system lacks a font for the special code points, the characters may show as empty boxes. The bundled Symbola font (or a similar one) may need to be installed there too. Most modern systems handle these code points out of the box.
- The IBus engine only transforms **letters and digits** and ignores Ctrl/Alt combinations, so normal editing shortcuts keep working while the input source is active.

---

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.
