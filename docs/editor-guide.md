# Editor Guide

The Draft Editor has **three input methods** for creating legal documents, all of which can be auto-formatted by AI.

---

## 1. Voice Dictation

Speak your legal text and it gets automatically transcribed and formatted.

### How to Use
1. Open the editor at `/editor`
2. Click the **microphone button** in the Voice Dictation panel (left side)
3. Start speaking your legal text naturally
4. The speech is transcribed in real-time (shows interim text in grey)
5. When you pause, the final text is sent to the AI for formatting
6. Formatted HTML appears in the WYSIWYG editor

### Features
- **Multi-language support:** English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada
- **Live audio visualizer:** Real-time waveform and volume meter
- **Recording timer:** Shows elapsed recording time
- **Collapsible panel:** Minimize when not in use
- **Continuous listening:** Records until you click stop

### Tips
- Speak in complete sentences for better formatting
- Mention legal keywords (WHEREAS, NOW THEREFORE) and the AI will bold them
- Say party names clearly — the AI will underline them
- Pause briefly between sections — the AI will add proper paragraph breaks

---

## 2. LLM Text Input

Type or paste text and have it auto-formatted by the AI before insertion into the editor.

### How to Use
1. Click the **"Type text to auto-format..."** button below the editor
2. The input area expands
3. Type or paste your raw legal text
4. Click **"Format & Insert"** or press **⌘+Enter** (Cmd+Enter)
5. The AI formats the text and inserts it into the WYSIWYG editor at the cursor position

### Use Cases
- Copying text from other documents and reformatting
- Writing legal clauses that you want properly structured
- Pasting dictated notes from other apps
- Quick formatting of rough drafts

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `⌘ + Enter` | Submit text for formatting & insertion |
| `Escape` | Collapse the text input |

---

## 3. WYSIWYG Editor

A full-featured rich text editor for direct manual editing.

### Toolbar Features
- **Text formatting:** Bold, Italic, Underline, Strikethrough
- **Headings:** H1, H2, H3
- **Lists:** Ordered, Unordered
- **Alignment:** Left, Center, Right, Justify
- **Font & Size:** Font family and size selectors
- **Color:** Text color and background color pickers

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `⌘ + B` | Bold |
| `⌘ + I` | Italic |
| `⌘ + U` | Underline |
| `⌘ + S` | Save |

### Status Bar
- Live **word count** and **character count** at the bottom

---

## AI Auto-Format

### How It Works
1. When "AI Format" is toggled **ON** (default), all text input is routed through the selected LLM
2. The AI applies legal document formatting rules:
   - Document titles → `<h2>`
   - Section headings → `<h3>`
   - Legal keywords → **bold** (WHEREAS, NOW THEREFORE, etc.)
   - Defined terms → *italic* on first mention
   - Party names → underlined
   - Numbered clauses → ordered lists
   - Recitals → blockquotes
3. The formatted HTML is inserted at the cursor position in the editor

### Toggle Auto-Format
- Click the **"AI Format"** / **"Raw Text"** toggle in the header bar
- When OFF, text is inserted as-is without AI processing

### Select Provider
- Use the **provider dropdown** in the header bar
- Available providers: Gemini, OpenAI, Claude, OpenRouter, LM Studio, Ollama
- Providers marked "(no key)" need API keys configured in `.env`
- The **model badge** shows which model was last used

### Formatting Indicator
- A **pulsing banner** appears above the editor while AI is formatting
- Shows the provider name (e.g., "AI formatting via Gemini (Google)...")

### Error Handling
- If the AI fails, an **error banner** appears with the error message
- The raw text is inserted as fallback so you never lose your dictated content
- Click **✕** to dismiss the error
