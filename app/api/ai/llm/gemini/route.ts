/**
 * POST /api/ai/llm/gemini
 * Direct Gemini (Google) endpoint for formatting dictated text.
 */
import { type NextRequest } from 'next/server';
import { geminiAdapter } from '@nakprc/lib/ai/providers/gemini';
import { LLMProviderError } from '@nakprc/lib/ai/types';

export async function POST(request: NextRequest) {
    try {
        const { text, existingContent, model } = await request.json();

        if (!text || text.trim().length === 0) {
            return Response.json({ error: 'Missing required field: text' }, { status: 400 });
        }

        if (!geminiAdapter.isAvailable()) {
            return Response.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 401 });
        }

        const result = await geminiAdapter.formatText(text, existingContent, model);
        return Response.json({ html: result.html, provider: 'gemini', model: result.model });
    } catch (err: unknown) {
        if (err instanceof LLMProviderError) {
            return Response.json({ error: err.message }, { status: err.statusCode });
        }
        const message = err instanceof Error ? err.message : 'Internal server error';
        return Response.json({ error: message }, { status: 500 });
    }
}
