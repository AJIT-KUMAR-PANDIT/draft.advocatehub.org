# Component Reference

All editor components live in `components/Editor/` and use SCSS modules with Tailwind v4 utilities.

---

## EditorOrchestrator

**File:** `components/Editor/EditorOrchestrator.tsx`  
**Type:** Client Component  
**Role:** Main layout component that wires voice dictation, LLM text input, and WYSIWYG editor together.

### State Management
- Uses `useAutoFormat` hook for AI formatting
- Manages voice panel collapse state
- Buffers dictated text (20+ char threshold before sending to LLM)
- Provides `handleLLMTextSubmit` for manual text input

### Layout
```
┌────────────────────────────────────────────┐
│              EditorHeader                   │
│ [doc title] [AI Format toggle] [provider ▼]│
├────────┬───────────────────────┬───────────┤
│ Voice  │   Center Column      │ Metadata  │
│ Input  │ ┌───────────────────┐│ Sidebar   │
│        │ │  WYSIWYG Editor   ││           │
│        │ └───────────────────┘│           │
│        │ ┌───────────────────┐│           │
│        │ │  LLM Text Input   ││           │
│        │ └───────────────────┘│           │
├────────┴───────────────────────┴───────────┤
│           FloatingContextBar                │
└────────────────────────────────────────────┘
```

---

## VoiceInput

**File:** `components/Editor/VoiceInput/VoiceInput.tsx`  
**Type:** Client Component

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onTranscript` | `(text: string, isFinal: boolean) => void` | ✅ | Called with transcribed text |
| `onRecordingStop` | `() => void` | ❌ | Called when recording stops (flushes pending text) |
| `isCollapsed` | `boolean` | ❌ | Whether the panel is minimized |
| `onToggleCollapse` | `() => void` | ❌ | Toggle collapse callback |

### Features
- Web Speech API integration
- Live audio waveform visualizer (Canvas + AudioContext)
- Volume meter
- Recording timer
- 8-language support
- Collapsible UI

---

## LLMTextInput

**File:** `components/Editor/LLMTextInput/LLMTextInput.tsx`  
**Type:** Client Component

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(text: string) => Promise<void>` | ✅ | Called with text to format & insert |
| `isFormatting` | `boolean` | ✅ | Whether AI is currently formatting |
| `providerLabel` | `string` | ✅ | Display name of the active provider |

### States
1. **Collapsed** — Shows trigger button "Type text to auto-format..."
2. **Expanded** — Shows textarea, header, footer with char count and submit button

### Keyboard Shortcuts
- `⌘+Enter` — Submit text
- `Escape` — Collapse

### Features
- Auto-resizing textarea (up to 200px)
- Character count
- Provider label display while formatting
- Disabled state during formatting
- Animated expand/collapse with Framer Motion

---

## WYSIWYGEditor

**File:** `components/Editor/WYSIWYGEditor/WYSIWYGEditor.tsx`  
**Type:** Client Component (forwardRef)

### Ref API (WYSIWYGEditorRef)

| Method | Signature | Description |
|--------|-----------|-------------|
| `insertText` | `(text: string) => void` | Insert plain text at cursor |
| `insertHTML` | `(html: string) => void` | Insert HTML at cursor (for LLM-formatted content) |
| `getHTML` | `() => string` | Get the editor's current HTML content |
| `focus` | `() => void` | Focus the editor |

### Toolbar Commands
Bold, Italic, Underline, Strikethrough, H1-H3, Ordered/Unordered List, Alignment (4), Font Family, Font Size, Text Color, Background Color

---

## EditorHeader

**File:** `components/Editor/EditorHeader/EditorHeader.tsx`  
**Type:** Client Component

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `provider` | `LLMProviderName` | ✅ | Currently selected provider |
| `setProvider` | `(p: LLMProviderName) => void` | ✅ | Change provider |
| `providers` | `ProviderInfo[]` | ✅ | List of available providers |
| `autoFormat` | `boolean` | ✅ | Whether auto-format is enabled |
| `setAutoFormat` | `(v: boolean) => void` | ✅ | Toggle auto-format |
| `isFormatting` | `boolean` | ✅ | Whether formatting is in progress |
| `lastModel` | `string \| null` | ✅ | Last model used |

### Contains
- Document title and version badge
- AI Format ON/OFF toggle
- Provider dropdown selector
- Model badge (shows last used model)
- Formatting spinner
- Save and AI Check buttons

---

## useAutoFormat Hook

**File:** `hooks/useAutoFormat.ts`

### Return Value

| Field | Type | Description |
|-------|------|-------------|
| `formatText` | `(text, existingContent?) => Promise<string \| null>` | Send text for formatting, returns HTML |
| `isFormatting` | `boolean` | Loading state |
| `error` | `string \| null` | Last error message |
| `clearError` | `() => void` | Clear the error |
| `provider` | `LLMProviderName` | Currently selected provider |
| `setProvider` | `(p) => void` | Change provider |
| `providers` | `ProviderInfo[]` | Available providers (fetched on mount) |
| `lastModel` | `string \| null` | Model that was last used |
| `autoFormat` | `boolean` | Whether auto-format is enabled |
| `setAutoFormat` | `(v) => void` | Toggle auto-format |

### Behavior
- Fetches available providers from `GET /api/ai/llm/response` on mount
- Auto-selects the default provider
- Cancels in-flight requests when a new one is made (AbortController)
- Returns `null` on abort (not treated as error)
