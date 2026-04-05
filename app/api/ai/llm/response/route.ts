/**
 * POST /api/ai/llm/response
 * 
 * Unified LLM endpoint — routes to the correct provider adapter.
 * Also supports GET to list available providers.
 */
import { type NextRequest } from 'next/server';
import { getAdapter, listProviders, getDefaultProvider } from '@nakprc/lib/ai/registry';
import { LLMProviderError, type FormatDictationRequest, type FormatDictationResponse } from '@nakprc/lib/ai/types';

export async function POST(request: NextRequest) {
    try {
        const body: FormatDictationRequest = await request.json();

        if (!body.text || body.text.trim().length === 0) {
            return Response.json({ error: 'Missing required field: text' }, { status: 400 });
        }

        const providerName = body.provider || getDefaultProvider();
        const adapter = getAdapter(providerName);

        if (!adapter.isAvailable()) {
            return Response.json(
                { error: `Provider "${providerName}" is not configured. Check your API keys in .env` },
                { status: 401 },
            );
        }

        const result = await adapter.formatText(body.text, body.existingContent, body.model);

        const response: FormatDictationResponse = {
            html: result.html,
            provider: providerName,
            model: result.model,
        };

        return Response.json(response);
    } catch (err: unknown) {
        if (err instanceof LLMProviderError) {
            return Response.json(
                { error: err.message, provider: err.provider },
                { status: err.statusCode },
            );
        }
        const message = err instanceof Error ? err.message : 'Internal server error';
        return Response.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    const providers = listProviders();
    const defaultProvider = getDefaultProvider();
    return Response.json({ providers, default: defaultProvider });
}
