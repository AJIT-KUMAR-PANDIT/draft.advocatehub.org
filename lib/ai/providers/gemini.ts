import { GoogleGenAI } from '@google/genai';
import { LLMAdapter, LLMAdapterResponse, LLMProviderError } from '../types';
import { LEGAL_FORMAT_SYSTEM_PROMPT, buildFormatPrompt } from '../prompts';

const DEFAULT_MODEL = 'gemini-2.0-flash';

export const geminiAdapter: LLMAdapter = {
    name: 'Gemini (Google)',

    isAvailable(): boolean {
        return !!process.env.GEMINI_API_KEY;
    },

    async formatText(text: string, existingContent?: string, model?: string): Promise<LLMAdapterResponse> {
        if (!this.isAvailable()) {
            throw new LLMProviderError('gemini', 'GEMINI_API_KEY is not configured', 401);
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
        const selectedModel = model || DEFAULT_MODEL;

        try {
            const response = await ai.models.generateContent({
                model: selectedModel,
                contents: buildFormatPrompt(text, existingContent),
                config: {
                    systemInstruction: LEGAL_FORMAT_SYSTEM_PROMPT,
                    temperature: 0.3,
                    maxOutputTokens: 4096,
                },
            });

            const html = response.text || '';
            return { html: html.trim(), model: selectedModel };
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            throw new LLMProviderError('gemini', message);
        }
    },
};
