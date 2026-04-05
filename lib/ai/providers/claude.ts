import Anthropic from '@anthropic-ai/sdk';
import { LLMAdapter, LLMAdapterResponse, LLMProviderError } from '../types';
import { LEGAL_FORMAT_SYSTEM_PROMPT, buildFormatPrompt } from '../prompts';

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

export const claudeAdapter: LLMAdapter = {
    name: 'Claude (Anthropic)',

    isAvailable(): boolean {
        return !!process.env.ANTHROPIC_API_KEY;
    },

    async formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse> {
        if (!this.isAvailable()) {
            throw new LLMProviderError('claude', 'ANTHROPIC_API_KEY is not configured', 401);
        }

        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const selectedModel = model || DEFAULT_MODEL;

        try {
            const response = await client.messages.create({
                model: selectedModel,
                max_tokens: 4096,
                system: LEGAL_FORMAT_SYSTEM_PROMPT,
                messages: [
                    { role: 'user', content: buildFormatPrompt(text, existingContent) },
                ],
            });

            const content = response.content[0];
            const html = content.type === 'text' ? content.text : '';
            return { html: html.trim(), model: selectedModel };
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            throw new LLMProviderError('claude', message);
        }
    },
};
