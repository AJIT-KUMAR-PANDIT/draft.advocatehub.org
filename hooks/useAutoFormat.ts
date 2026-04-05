'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { LLMProviderName, FormatDictationResponse } from '@nakprc/lib/ai/types';

interface ProviderInfo {
    name: LLMProviderName;
    label: string;
    available: boolean;
}

interface UseAutoFormatReturn {
    /** Send dictated text to the LLM for formatting */
    formatText: (text: string, existingContent?: string) => Promise<string | null>;
    /** Whether a formatting request is in progress */
    isFormatting: boolean;
    /** Last error message, if any */
    error: string | null;
    /** Clear the error */
    clearError: () => void;
    /** Currently selected provider */
    provider: LLMProviderName;
    /** Change the selected provider */
    setProvider: (p: LLMProviderName) => void;
    /** Available providers (fetched from API) */
    providers: ProviderInfo[];
    /** The model that was last used */
    lastModel: string | null;
    /** Auto-format toggle */
    autoFormat: boolean;
    /** Toggle auto-format on/off */
    setAutoFormat: (v: boolean) => void;
}

export function useAutoFormat(): UseAutoFormatReturn {
    const [isFormatting, setIsFormatting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [provider, setProvider] = useState<LLMProviderName>('gemini');
    const [providers, setProviders] = useState<ProviderInfo[]>([]);
    const [lastModel, setLastModel] = useState<string | null>(null);
    const [autoFormat, setAutoFormat] = useState(true);
    const abortRef = useRef<AbortController | null>(null);

    // Fetch available providers on mount
    useEffect(() => {
        async function fetchProviders() {
            try {
                const res = await fetch('/api/ai/llm/response');
                if (res.ok) {
                    const data = await res.json();
                    setProviders(data.providers || []);
                    if (data.default) {
                        setProvider(data.default);
                    }
                }
            } catch {
                // Silently fail — we'll use defaults
            }
        }
        fetchProviders();
    }, []);

    const formatText = useCallback(async (text: string, existingContent?: string): Promise<string | null> => {
        // Cancel any in-flight request
        if (abortRef.current) {
            abortRef.current.abort();
        }

        setIsFormatting(true);
        setError(null);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch('/api/ai/llm/response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    provider,
                    existingContent,
                }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(data.error || `HTTP ${res.status}`);
            }

            const data: FormatDictationResponse = await res.json();
            setLastModel(data.model);
            return data.html;
        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === 'AbortError') {
                return null; // Request was cancelled, not an error
            }
            const message = err instanceof Error ? err.message : 'Formatting failed';
            setError(message);
            return null;
        } finally {
            setIsFormatting(false);
            abortRef.current = null;
        }
    }, [provider]);

    const clearError = useCallback(() => setError(null), []);

    return {
        formatText,
        isFormatting,
        error,
        clearError,
        provider,
        setProvider,
        providers,
        lastModel,
        autoFormat,
        setAutoFormat,
    };
}
