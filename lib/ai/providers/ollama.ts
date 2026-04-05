import { LLMAdapter, LLMAdapterResponse, LLMProviderError } from '../types';
import { LEGAL_FORMAT_SYSTEM_PROMPT, buildFormatPrompt } from '../prompts';

const DEFAULT_MODEL = 'llama3';

interface OllamaGenerateResponse {
    model: string;
    response: string;
    done: boolean;
}

export const ollamaAdapter: LLMAdapter = {
    name: 'Ollama (Local)',

    isAvailable(): boolean {
        // Ollama is local — always "available" in config, errors at request time if not running
        return true;
    },

    async formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse> {
        const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        const selectedModel = model || process.env.OLLAMA_MODEL || DEFAULT_MODEL;

        const prompt = `${LEGAL_FORMAT_SYSTEM_PROMPT}\n\n---\n\n${buildFormatPrompt(text, existingContent)}`;

        try {
            const response = await fetch(`${baseURL}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: selectedModel,
                    prompt,
                    stream: false,
                    options: {
                        temperature: 0.3,
                        num_predict: 4096,
                    },
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Ollama returned ${response.status}: ${errText}`);
            }

            const data: OllamaGenerateResponse = await response.json();
            return { html: data.response.trim(), model: selectedModel };
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            throw new LLMProviderError(
                'ollama',
                `Ollama connection failed (${baseURL}). Is Ollama running? ${message}`,
            );
        }
    },
};
