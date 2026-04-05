# LLM API Reference

All API endpoints accept `POST` requests with JSON bodies and return JSON responses.

---

## Unified Endpoint

### `POST /api/ai/llm/response`

Routes to the correct provider adapter based on the `provider` field.

**Request Body:**
```json
{
  "text": "this nondisclosure agreement is made and entered into...",
  "provider": "gemini",
  "existingContent": "<p>Previous content in editor...</p>",
  "model": "gemini-2.0-flash"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | ✅ | Raw dictated/typed text to format |
| `provider` | string | ❌ | Provider name. Defaults to first available (priority: gemini > openai > claude > openrouter > lmstudio > ollama) |
| `existingContent` | string | ❌ | Existing editor HTML for context continuity |
| `model` | string | ❌ | Override the default model for the provider |

**Success Response (200):**
```json
{
  "html": "<p>This Nondisclosure Agreement is made and entered into...</p>",
  "provider": "gemini",
  "model": "gemini-2.0-flash"
}
```

**Error Responses:**
```json
// 400 - Missing text
{ "error": "Missing required field: text" }

// 401 - Provider not configured
{ "error": "Provider \"openai\" is not configured. Check your API keys in .env" }

// 500 - LLM error
{ "error": "[gemini] API quota exceeded", "provider": "gemini" }
```

### `GET /api/ai/llm/response`

Returns the list of all providers with their availability status.

**Response:**
```json
{
  "providers": [
    { "name": "gemini", "label": "Gemini (Google)", "available": true },
    { "name": "openai", "label": "OpenAI", "available": false },
    { "name": "claude", "label": "Claude (Anthropic)", "available": false },
    { "name": "openrouter", "label": "OpenRouter", "available": false },
    { "name": "lmstudio", "label": "LM Studio (Local)", "available": true },
    { "name": "ollama", "label": "Ollama (Local)", "available": true }
  ],
  "default": "gemini"
}
```

---

## Direct Provider Endpoints

Each provider also has a direct endpoint for when you want to bypass the unified router.

### `POST /api/ai/llm/openai`
- **Default model:** `gpt-4o`
- **Requires:** `OPENAI_API_KEY` in `.env`

### `POST /api/ai/llm/claude`
- **Default model:** `claude-sonnet-4-20250514`
- **Requires:** `ANTHROPIC_API_KEY` in `.env`

### `POST /api/ai/llm/gemini`
- **Default model:** `gemini-2.0-flash`
- **Requires:** `GEMINI_API_KEY` in `.env`

### `POST /api/ai/llm/openrouter`
- **Default model:** `meta-llama/llama-3.1-8b-instruct:free`
- **Requires:** `OPENROUTER_API_KEY` in `.env`

### `POST /api/ai/llm/local/lmstudio`
- **Default model:** `default` (whatever is loaded in LM Studio)
- **Requires:** LM Studio running on `http://localhost:1234`
- **No API key needed**

### `POST /api/ai/llm/local/ollama`
- **Default model:** `llama3`
- **Requires:** Ollama running on `http://localhost:11434`
- **No API key needed**

All direct endpoints use the same request/response format:

**Request:**
```json
{
  "text": "raw text to format",
  "existingContent": "optional existing HTML",
  "model": "optional model override"
}
```

**Response:**
```json
{
  "html": "<p>Formatted HTML...</p>",
  "provider": "openai",
  "model": "gpt-4o"
}
```

---

## System Prompt

All providers receive the same system prompt that instructs the LLM to:

1. **Output ONLY HTML** — no markdown, no code fences
2. **Preserve all dictated content** — fix grammar/punctuation artifacts only
3. **Apply legal document formatting:**
   - `<h2>` for document titles
   - `<h3>` for section headings
   - `<strong>` for legal keywords (WHEREAS, NOW THEREFORE, etc.)
   - `<em>` for defined terms on first mention
   - `<u>` for party names
   - `<ol>/<li>` for numbered clauses
   - `<blockquote>` for recitals

The full system prompt is defined in `lib/ai/prompts.ts`.

---

## Testing with cURL

```bash
# Unified endpoint (auto-selects provider)
curl -X POST http://localhost:3000/api/ai/llm/response \
  -H "Content-Type: application/json" \
  -d '{"text": "this nondisclosure agreement is made by abc corp and xyz ventures", "provider": "gemini"}'

# Direct Gemini endpoint
curl -X POST http://localhost:3000/api/ai/llm/gemini \
  -H "Content-Type: application/json" \
  -d '{"text": "whereas the parties wish to explore a business relationship"}'

# List available providers
curl http://localhost:3000/api/ai/llm/response
```
