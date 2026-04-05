# Architecture Overview

## System Design

The AdvocateHub Draft Editor follows a **three-layer architecture**:

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (React)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Voice   │ │ LLM Text │ │  WYSIWYG Editor  │ │
│  │ Dictation│ │  Input   │ │  (contentEditable)│ │
│  └────┬─────┘ └────┬─────┘ └────────▲─────────┘ │
│       │             │                │           │
│       └──────┬──────┘                │           │
│              ▼                       │           │
│     EditorOrchestrator ──────────────┘           │
│              │                                   │
│         useAutoFormat (hook)                      │
│              │                                   │
└──────────────┼───────────────────────────────────┘
               │ POST /api/ai/llm/response
               ▼
┌──────────────────────────────────────────────────┐
│              API LAYER (Next.js)                  │
│                                                  │
│  /api/ai/llm/response  ← Unified routing endpoint│
│       │                                          │
│       ├── /api/ai/llm/openai                     │
│       ├── /api/ai/llm/claude                     │
│       ├── /api/ai/llm/gemini                     │
│       ├── /api/ai/llm/openrouter                 │
│       ├── /api/ai/llm/local/lmstudio             │
│       └── /api/ai/llm/local/ollama               │
│                                                  │
│  Registry → selects adapter based on provider    │
│                                                  │
└──────────────┼───────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────┐
│            PROVIDER ADAPTERS (lib/ai/)            │
│                                                  │
│  Each adapter implements the LLMAdapter interface │
│  ┌─────────────────────────────────────────────┐ │
│  │ interface LLMAdapter {                      │ │
│  │   name: string                              │ │
│  │   isAvailable(): boolean                    │ │
│  │   formatText(text, context?, model?): HTML  │ │
│  │ }                                           │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  Uses: openai SDK, @anthropic-ai/sdk,            │
│        @google/genai, fetch (Ollama)             │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Data Flow

### Voice Dictation → Auto-Format → Editor

```
1. User speaks into microphone
2. Web Speech API → SpeechRecognition → transcript text
3. VoiceInput calls onTranscript(rawText, isFinal=true)
4. EditorOrchestrator accumulates text (20+ char buffer)
5. useAutoFormat.formatText() → POST /api/ai/llm/response
6. API routes to correct provider adapter
7. LLM returns formatted HTML
8. EditorOrchestrator calls editorRef.insertHTML(html)
9. Formatted content appears in WYSIWYG editor
```

### LLM Text Input → Auto-Format → Editor

```
1. User types or pastes text in the LLM Text Input area
2. Presses "Format & Insert" or Cmd+Enter
3. EditorOrchestrator.handleLLMTextSubmit(text)
4. Same flow as above: useAutoFormat → API → LLM → insertHTML
```

### Fallback Behavior

If the LLM call fails (API key missing, network error, provider down):
- Raw text is inserted directly into the editor as plain text
- Error banner appears above the editor with the error message
- User can dismiss the error and continue working

## Key Design Decisions

### Why a Provider Registry?
All providers implement the same `LLMAdapter` interface. The registry (`lib/ai/registry.ts`) maps provider names to adapters, allowing:
- Hot-swapping providers from the UI dropdown
- Auto-detection of the first available provider
- Consistent error handling across all providers

### Why OpenAI SDK for Multiple Providers?
OpenAI, OpenRouter, and LM Studio all use the OpenAI-compatible API format. By reusing the `openai` SDK with different `baseURL` values, we avoid extra dependencies.

### Why Batch Over Streaming?
The current implementation uses batch (non-streaming) responses for simplicity. Each dictated chunk is formatted as a complete unit. Streaming can be added later if needed.

### Why contentEditable for the Editor?
A custom `contentEditable` div gives full control over HTML insertion, formatting, and cursor management without the overhead of a third-party editor library.
