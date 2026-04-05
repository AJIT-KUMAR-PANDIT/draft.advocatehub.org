import OpenAI from 'openai';
import { LLMAdapter, LLMAdapterResponse, LLMProviderError } from '../types';
import { LEGAL_FORMAT_SYSTEM_PROMPT, buildFormatPrompt } from '../prompts';

const DEFAULT_MODEL = 'default';

export const lmstudioAdapter: LLMAdapter = {
    name: 'LM Studio (Local)',

    isAvailable(): boolean {
        // LM Studio is local — no API key needed, just needs to be running
        return true;
    },

    async formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse> {
        const baseURL = process.env.LMSTUDIO_BASE_URL || 'http://localhost:1234/v1';
        const selectedModel = model || process.env.LMSTUDIO_MODEL || DEFAULT_MODEL;

        const client = new OpenAI({
            apiKey: 'lm-studio', // LM Studio doesn't validate API keys
            baseURL,
        });

        try {
            const response = await client.chat.completions.create({
                model: selectedModel,
                messages: [
                    { role: 'system', content: LEGAL_FORMAT_SYSTEM_PROMPT },
                    { role: 'user', content: buildFormatPrompt(text, existingContent) },
                ],
                temperature: 0.3,
                max_tokens: 4096,
            });

            const html = response.choices[0]?.message?.content || '';
            return { html: html.trim(), model: selectedModel };
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            throw new LLMProviderError(
                'lmstudio',
                `LM Studio connection failed (${baseURL}). Is LM Studio running? ${message}`,
            );
        }
    },
};
