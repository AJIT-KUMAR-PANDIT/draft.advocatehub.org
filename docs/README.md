# AdvocateHub Draft Editor — Documentation

> AI-powered legal document drafting platform with voice dictation, multi-LLM auto-formatting, and rich WYSIWYG editing.

## Table of Contents

| Document | Description |
|----------|-------------|
| [Architecture Overview](./architecture.md) | System design, data flow, and component relationships |
| [LLM API Reference](./llm-api.md) | All API endpoints, request/response formats, and provider details |
| [Editor Guide](./editor-guide.md) | Voice dictation, LLM text input, WYSIWYG editor, and auto-formatting |
| [Provider Setup](./provider-setup.md) | How to configure each LLM provider (API keys, local setup) |
| [Component Reference](./components.md) | Frontend component documentation and props reference |

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure at least one LLM provider
echo "GEMINI_API_KEY=your-key-here" >> .env

# 3. Start the dev server
pnpm dev

# 4. Open the editor
open http://localhost:3000/editor
```

## Directory Structure

```
draft.advocatehub.org/
├── app/
│   ├── api/ai/llm/           # LLM API route handlers
│   │   ├── response/          # Unified endpoint (all providers)
│   │   ├── openai/            # Direct OpenAI endpoint
│   │   ├── claude/            # Direct Claude endpoint
│   │   ├── gemini/            # Direct Gemini endpoint
│   │   ├── openrouter/        # Direct OpenRouter endpoint
│   │   └── local/
│   │       ├── lmstudio/      # Direct LM Studio endpoint
│   │       └── ollama/        # Direct Ollama endpoint
│   └── editor/                # Editor page
├── lib/ai/                    # LLM abstraction layer
│   ├── types.ts               # Shared interfaces
│   ├── prompts.ts             # AI formatting system prompts
│   ├── registry.ts            # Provider registry & auto-detection
│   └── providers/             # Per-provider adapters
│       ├── openai.ts
│       ├── claude.ts
│       ├── gemini.ts
│       ├── openrouter.ts
│       ├── lmstudio.ts
│       └── ollama.ts
├── components/Editor/         # Editor UI components
│   ├── EditorOrchestrator.tsx # Main orchestrator
│   ├── WYSIWYGEditor/         # Rich text editor
│   ├── VoiceInput/            # Voice dictation panel
│   ├── LLMTextInput/          # Manual text input for AI formatting
│   ├── EditorHeader/          # Header with provider selector
│   ├── MetadataSidebar/       # Document metadata
│   └── FloatingContextBar/    # Quick actions toolbar
├── hooks/
│   └── useAutoFormat.ts       # AI auto-format React hook
└── docs/                      # This documentation
```
