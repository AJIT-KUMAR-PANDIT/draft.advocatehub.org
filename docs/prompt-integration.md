# LLM Prompt Integration Guide

## Overview

This document describes the LLM prompt integration for the Advocate Hub platform. The system uses a comprehensive prompt configuration that handles auto-formatting of legal documents, correspondence, and other text types.

## Prompt System Architecture

### File Structure

```
/
├── llm/
│   └── prompt.txt              # Main comprehensive prompt configuration
├── lib/
│   └── ai/
│       ├── prompts.ts          # Exported prompt constants
│       ├── types.ts            # Type definitions
│       └── providers/          # Provider adapters (auto-import prompt)
├── app/
│   └── api/
│       └── ai/
│           └── llm/            # API routes (use providers)
└── components/
    └── Editor/                 # UI components (consume API)
```

### Core Components

#### 1. Prompt Configuration (`llm/prompt.txt`)

The main prompt file contains:

- **Legal Document Formatter** - System instructions for converting raw text to formatted HTML
- **Core Formatting Rules** - 8 key formatting guidelines
- **Document Types** - Support for NDA, Employment Agreements, Service Agreements, Letters, Memos
- **Auto-Formatting Requirements** - Automatic corrections, metadata extraction, context awareness
- **Examples** - Input/output examples for training
- **Error Handling** - Edge case management
- **Quality Standards** - Professional appearance requirements

#### 2. Prompt Export (`lib/ai/prompts.ts`)

Exports two main functions:

- `LEGAL_FORMAT_SYSTEM_PROMPT` - The comprehensive system prompt string
- `buildFormatPrompt(dictatedText, existingContent)` - Builds the user prompt with context

#### 3. Provider Adapters

All provider adapters automatically use the LEGAL_FORMAT_SYSTEM_PROMPT:

- **OpenAI** (`lib/ai/providers/openai.ts`) - GPT models
- **Ollama** (`lib/ai/providers/ollama.ts`) - Local LLMs
- **Gemini** (`lib/ai/providers/gemini.ts`) - Google AI
- **Claude** (`lib/ai/providers/claude.ts`) - Anthropic AI
- **LM Studio** (`lib/ai/providers/lmstudio.ts`) - Local AI
- **OpenRouter** (`lib/ai/providers/openrouter.ts`) - Multi-provider

#### 4. API Route

`app/api/ai/llm/response/route.ts` - Unified endpoint that routes to the appropriate provider adapter.

## Auto-Formatting Features

### Automatic Corrections

- Capitalization of sentences
- Proper punctuation (commas, periods, semicolons)
- Speech-to-text error fixes
- Legal terminology standardization

### Metadata Extraction (Internal)

Documents can include metadata that's extracted for document management:

- Document type
- Parties involved
- Key terms
- Date
- Location

### Context Awareness

The system maintains document consistency:

- Follows previous formatting patterns
- Preserves document structure (numbering, headings)
- Continues formatting style from existing content

## HTML Output Format

The system produces pure HTML suitable for WYSIWYG editor:

- `<h2>` for document titles
- `<h3>` for section headings
- `<p>` for paragraphs
- `<strong>` for legal keywords
- `<em>` for defined terms
- `<u>` for party names
- `<ol>` / `<li>` for numbered clauses
- `<blockquote>` for recitals

## Usage Examples

### Basic Usage

```typescript
// In a component
import { buildFormatPrompt } from '@nakprc/lib/ai/prompts';

const formattedText = await fetch('/api/ai/llm/response', {
  method: 'POST',
  body: JSON.stringify({
    text: 'this is raw dictated text',
    provider: 'openai',
    model: 'gpt-4o'
  })
});
```

### With Existing Content

```typescript
const formattedText = await fetch('/api/ai/llm/response', {
  method: 'POST',
  body: JSON.stringify({
    text: 'additional dictated text',
    existingContent: '<p>previous content...</p>',
    provider: 'ollama',
    model: 'llama3'
  })
});
```

### In UI Component

```typescript
// Editor component automatically handles formatting
const [html, setHtml] = useState('');

const handleTextFormatting = async (rawText: string) => {
  const response = await fetch('/api/ai/llm/response', {
    method: 'POST',
    body: JSON.stringify({
      text: rawText,
      provider: 'openai'
    })
  });
  
  const data = await response.json();
  setHtml(data.html);
};
```

## Configuration

### Environment Variables

Set up your preferred provider:

```env
# OpenAI
OPENAI_API_KEY=sk-your-key

# Ollama (Local)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3

# Gemini (Google)
GEMINI_API_KEY=your-key

# Claude (Anthropic)
ANTHROPIC_API_KEY=your-key

# LM Studio (Local)
LMSTUDIO_BASE_URL=http://localhost:1234
LMSTUDIO_MODEL=local-model

# OpenRouter
OPENROUTER_API_KEY=your-key
```

### Default Provider

Configure the default provider in `lib/ai/registry.ts` or specify in the API request.

## API Endpoints

### POST /api/ai/llm/response

Formats dictated text into structured HTML.

**Request Body:**

```typescript
{
  text: string;              // Required: Raw dictated text
  existingContent?: string;  // Optional: Existing document HTML
  provider?: string;         // Optional: Provider name
  model?: string;            // Optional: Model name
}
```

**Response:**

```typescript
{
  html: string;              // Formatted HTML
  provider: string;          // Used provider
  model: string;             // Used model
}
```

### GET /api/ai/llm/response

Lists available providers.

**Response:**

```typescript
{
  providers: string[];       // Available provider names
  default: string;           // Default provider
}
```

## Supported Document Types

1. **NDA / Non-Disclosure Agreements** - Formal agreements with recitals
2. **Employment Agreements** - Standard employment contracts
3. **Service Agreements** - Service provider agreements
4. **Letters & Correspondence** - Business letters and emails
5. **Memos & Notices** - Internal communications

## Quality Standards

The system ensures:

- Professional legal appearance
- Clear hierarchy of information
- Easy to read and navigate
- Consistent with Indian legal formatting standards
- Proper paragraph breaks and spacing
- Correct use of legal keywords

## Troubleshooting

### Provider Not Available

- Check API keys in `.env`
- Verify provider is running (for local providers)
- Check provider configuration

### Poor Formatting

- Ensure raw text is complete
- Review prompt rules in `llm/prompt.txt`
- Check output for HTML tags

### API Errors

- Check server logs
- Verify model name is correct
- Ensure sufficient tokens available

## Customizing the Prompt

To customize the prompt:

1. Edit `llm/prompt.txt` with your desired prompt structure
2. The changes will automatically apply to all provider adapters
3. No code changes needed - prompts are exported from `lib/ai/prompts.ts`

## Best Practices

1. **Be Specific**: Provide complete text to avoid truncation
2. **Use Context**: Include existing content for consistency
3. **Choose Right Provider**:
   - Local: Ollama, LM Studio (no API costs)
   - Cloud: OpenAI, Gemini, Claude (best quality)
4. **Monitor Quality**: Review formatted output for accuracy
5. **Customize**: Modify prompt for specific use cases

## Integration Checklist

- [x] Create `llm/prompt.txt` with comprehensive prompt
- [x] Export prompt in `lib/ai/prompts.ts`
- [x] Update all provider adapters (no changes needed)
- [x] Configure API routes
- [x] Set up environment variables
- [ ] Test with real documents
- [ ] Monitor formatting quality
- [ ] Document custom use cases
