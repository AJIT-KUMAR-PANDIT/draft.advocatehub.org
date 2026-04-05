/**
 * Provider Registry — resolves a provider name to its adapter instance.
 */
import { LLMAdapter, LLMProviderName, LLMProviderError } from './types';
import { openaiAdapter } from './providers/openai';
import { claudeAdapter } from './providers/claude';
import { geminiAdapter } from './providers/gemini';
import { openrouterAdapter } from './providers/openrouter';
import { lmstudioAdapter } from './providers/lmstudio';
import { ollamaAdapter } from './providers/ollama';

const ADAPTERS: Record<LLMProviderName, LLMAdapter> = {
    openai: openaiAdapter,
    claude: claudeAdapter,
    gemini: geminiAdapter,
    openrouter: openrouterAdapter,
    lmstudio: lmstudioAdapter,
    ollama: ollamaAdapter,
};

/**
 * Get the adapter for a given provider name.
 * Throws if the provider name is invalid.
 */
export function getAdapter(provider: string): LLMAdapter {
    const adapter = ADAPTERS[provider as LLMProviderName];
    if (!adapter) {
        throw new LLMProviderError(
            provider as LLMProviderName,
            `Unknown provider: "${provider}". Valid providers: ${Object.keys(ADAPTERS).join(', ')}`,
            400,
        );
    }
    return adapter;
}

/**
 * List all providers with their availability status.
 */
export function listProviders(): Array<{ name: LLMProviderName; label: string; available: boolean }> {
    return Object.entries(ADAPTERS).map(([name, adapter]) => ({
        name: name as LLMProviderName,
        label: adapter.name,
        available: adapter.isAvailable(),
    }));
}

/**
 * Get the first available cloud provider (for auto-detection).
 */
export function getDefaultProvider(): LLMProviderName {
    // Priority: gemini > openai > claude > openrouter > local
    const priority: LLMProviderName[] = ['gemini', 'openai', 'claude', 'openrouter', 'lmstudio', 'ollama'];
    for (const name of priority) {
        if (ADAPTERS[name].isAvailable()) return name;
    }
    return 'gemini'; // fallback
}
