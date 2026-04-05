# Provider Setup Guide

Configure LLM providers by adding API keys to your `.env` file. You need **at least one** provider configured for AI auto-formatting to work.

---

## Cloud Providers

### 🟢 Google Gemini (Recommended Default)

The default provider. Free tier available.

```env
GEMINI_API_KEY=your-gemini-api-key
```

**Get your key:**
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key into `.env`

**Default model:** `gemini-2.0-flash`  
**SDK:** `@google/genai` (already installed)

---

### 🔵 OpenAI

```env
OPENAI_API_KEY=sk-your-openai-api-key
```

**Get your key:**
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Copy it into `.env`

**Default model:** `gpt-4o`  
**SDK:** `openai` (already installed)

---

### 🟣 Anthropic Claude

```env
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
```

**Get your key:**
1. Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Create a new API key
3. Copy it into `.env`

**Default model:** `claude-sonnet-4-20250514`  
**SDK:** `@anthropic-ai/sdk` (already installed)

---

### 🟠 OpenRouter

Access many models through a single API. Has free models available.

```env
OPENROUTER_API_KEY=sk-or-your-openrouter-key
```

**Get your key:**
1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Create a new key
3. Copy it into `.env`

**Default model:** `meta-llama/llama-3.1-8b-instruct:free`  
**SDK:** Uses `openai` SDK with custom baseURL

---

## Local Providers

No API keys needed — runs entirely on your machine.

### 🖥️ LM Studio

Run any open-source model locally with a GUI.

```env
# Optional — defaults shown
LMSTUDIO_BASE_URL=http://localhost:1234/v1
LMSTUDIO_MODEL=default
```

**Setup:**
1. Download [LM Studio](https://lmstudio.ai/)
2. Load a model (recommended: Llama 3, Mistral, Phi-3)
3. Start the local server (click "Start Server" in LM Studio)
4. The adapter will automatically connect to `localhost:1234`

**Default model:** Whatever is loaded in LM Studio  
**SDK:** Uses `openai` SDK with local baseURL

---

### 🦙 Ollama

Run models via CLI. Lightweight and fast.

```env
# Optional — defaults shown
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

**Setup:**
1. Install Ollama: `curl -fsSL https://ollama.com/install.sh | sh` (or [download](https://ollama.com/download))
2. Pull a model: `ollama pull llama3`
3. Ollama runs as a service automatically
4. The adapter connects to `localhost:11434`

**Recommended models:**
```bash
ollama pull llama3        # General purpose (default)
ollama pull mistral       # Fast, good for formatting
ollama pull phi3          # Small but capable
ollama pull codellama     # If working with structured text
```

**Default model:** `llama3`  
**API:** Native Ollama REST API (`/api/generate`)

---

## Provider Priority

When no provider is specified in a request, the system auto-detects the first available provider in this order:

1. **Gemini** — `GEMINI_API_KEY`
2. **OpenAI** — `OPENAI_API_KEY`
3. **Claude** — `ANTHROPIC_API_KEY`
4. **OpenRouter** — `OPENROUTER_API_KEY`
5. **LM Studio** — Always available (local)
6. **Ollama** — Always available (local)

---

## Environment File Template

```env
# Google Gemini (Default)
GEMINI_API_KEY=

# OpenAI
OPENAI_API_KEY=

# Anthropic Claude
ANTHROPIC_API_KEY=

# OpenRouter
OPENROUTER_API_KEY=

# Local: LM Studio
# LMSTUDIO_BASE_URL=http://localhost:1234/v1
# LMSTUDIO_MODEL=default

# Local: Ollama
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=llama3

# Site URL
NEXT_PUBLIC_SITE_URL=https://draft.advocatehub.org
```

---

## Verifying Your Setup

```bash
# Start the dev server
pnpm dev

# Check which providers are available
curl http://localhost:3000/api/ai/llm/response

# Test formatting with your configured provider
curl -X POST http://localhost:3000/api/ai/llm/response \
  -H "Content-Type: application/json" \
  -d '{"text": "this agreement is entered into by and between party a and party b whereas both parties agree to the following terms"}'
```
