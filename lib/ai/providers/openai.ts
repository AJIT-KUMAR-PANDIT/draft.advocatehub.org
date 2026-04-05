import OpenAI from 'openai';
import { LLMAdapter, LLMAdapterResponse, LLMProviderError } from '../types';
import { LEGAL_FORMAT_SYSTEM_PROMPT, buildFormatPrompt } from '../prompts';

const DEFAULT_MODEL = 'gpt-4o';

export const openaiAdapter: LLMAdapter = {
    name: 'OpenAI',

    isAvailable(): boolean {
        return !!process.env.OPENAI_API_KEY;
    },

    async formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse> {
        if (!this.isAvailable()) {
            throw new LLMProviderError('openai', 'OPENAI_API_KEY is not configured', 401);
        }

        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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
            throw new LLMProviderError('openai', message);
        }
    },
};
