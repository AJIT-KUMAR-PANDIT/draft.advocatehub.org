import OpenAI from 'openai';
import { LLMAdapter, LLMAdapterResponse, LLMProviderError } from '../types';
import { LEGAL_FORMAT_SYSTEM_PROMPT, buildFormatPrompt } from '../prompts';

const DEFAULT_MODEL = 'meta-llama/llama-3.1-8b-instruct:free';

export const openrouterAdapter: LLMAdapter = {
    name: 'OpenRouter',

    isAvailable(): boolean {
        return !!process.env.OPENROUTER_API_KEY;
    },

    async formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse> {
        if (!this.isAvailable()) {
            throw new LLMProviderError('openrouter', 'OPENROUTER_API_KEY is not configured', 401);
        }

        const client = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://draft.advocatehub.org',
                'X-Title': 'AdvocateHub Draft Editor',
            },
        });
        const selectedModel = model || DEFAULT_MODEL;

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
            throw new LLMProviderError('openrouter', message);
        }
    },
};
