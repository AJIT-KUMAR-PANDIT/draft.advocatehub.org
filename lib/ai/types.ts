/**
 * Shared types for the LLM provider abstraction layer.
 * All providers implement the same interface so they can be swapped transparently.
 */

// ── Provider identifiers ──
export type LLMProviderName =
    | 'openai'
    | 'claude'
    | 'gemini'
    | 'openrouter'
    | 'lmstudio'
    | 'ollama';

export const LLM_PROVIDER_LABELS: Record<LLMProviderName, string> = {
    openai: 'OpenAI',
    claude: 'Claude (Anthropic)',
    gemini: 'Gemini (Google)',
    openrouter: 'OpenRouter',
    lmstudio: 'LM Studio (Local)',
    ollama: 'Ollama (Local)',
};

// ── Request / Response for formatting ──
export interface FormatDictationRequest {
    /** The raw dictated text to format */
    text: string;
    /** Which LLM provider to use */
    provider: LLMProviderName;
    /** Optional: existing document context for continuity */
    existingContent?: string;
    /** Optional: specific model override (e.g. 'gpt-4o', 'claude-sonnet-4-20250514') */
    model?: string;
}

export interface FormatDictationResponse {
    /** The formatted HTML ready for the WYSIWYG editor */
    html: string;
    /** Which provider handled the request */
    provider: LLMProviderName;
    /** Which model was used */
    model: string;
}

// ── Internal adapter interface ──
export interface LLMAdapter {
    /** Human-readable name */
    name: string;
    /** Format dictated text into structured HTML */
    formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse>;
    /** Check if this provider is configured (env keys present) */
    isAvailable(): boolean;
}

export interface LLMAdapterResponse {
    html: string;
    model: string;
}

// ── Error types ──
export class LLMProviderError extends Error {
    constructor(
        public provider: LLMProviderName,
        message: string,
        public statusCode: number = 500,
    ) {
        super(`[${provider}] ${message}`);
        this.name = 'LLMProviderError';
    }
}
