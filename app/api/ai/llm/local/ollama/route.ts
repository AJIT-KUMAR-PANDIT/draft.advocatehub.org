/**
 * POST /api/ai/llm/local/ollama
 * Direct Ollama (local) endpoint for formatting dictated text.
 */
import { type NextRequest } from 'next/server';
import { ollamaAdapter } from '@nakprc/lib/ai/providers/ollama';
import { LLMProviderError } from '@nakprc/lib/ai/types';

export async function POST(request: NextRequest) {
    try {
        const { text, existingContent, model } = await request.json();

        if (!text || text.trim().length === 0) {
            return Response.json({ error: 'Missing required field: text' }, { status: 400 });
        }

        const result = await ollamaAdapter.formatText(text, existingContent, model);
        return Response.json({ html: result.html, provider: 'ollama', model: result.model });
    } catch (err: unknown) {
        if (err instanceof LLMProviderError) {
            return Response.json({ error: err.message }, { status: err.statusCode });
        }
        const message = err instanceof Error ? err.message : 'Internal server error';
        return Response.json({ error: message }, { status: 500 });
    }
}
