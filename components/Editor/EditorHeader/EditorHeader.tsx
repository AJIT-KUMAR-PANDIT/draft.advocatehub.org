'use client';

import React from 'react';
import styles from './EditorHeader.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Image from 'next/image';
import type { LLMProviderName } from '@nakprc/lib/ai/types';

interface ProviderInfo {
    name: LLMProviderName;
    label: string;
    available: boolean;
}

interface EditorHeaderProps {
    provider: LLMProviderName;
    setProvider: (p: LLMProviderName) => void;
    providers: ProviderInfo[];
    autoFormat: boolean;
    setAutoFormat: (v: boolean) => void;
    isFormatting: boolean;
    lastModel: string | null;
}

export default function EditorHeader({
    provider,
    setProvider,
    providers,
    autoFormat,
    setAutoFormat,
    isFormatting,
    lastModel,
}: EditorHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <div className={styles.title}>NDA - ABC Corp</div>
                <div className={styles.divider} />
                <div className={styles.badges}>
                    <span className={styles.version}>Version 2.4</span>
                    <span className={styles.status}>Drafting</span>
                </div>
            </div>

            {/* Center: AI Provider Controls */}
            <div className={styles.aiControls}>
                {/* Auto-format toggle */}
                <button
                    className={`${styles.toggleBtn} ${autoFormat ? styles.active : ''}`}
                    onClick={() => setAutoFormat(!autoFormat)}
                    title={autoFormat ? 'Auto-format ON' : 'Auto-format OFF'}
                    id="auto-format-toggle"
                >
                    <AnimatedIcon icon="auto_awesome" className={styles.toggleIcon} />
                    <span className={styles.toggleLabel}>
                        {autoFormat ? 'AI Format' : 'Raw Text'}
                    </span>
                </button>

                {autoFormat && (
                    <>
                        <div className={styles.miniDivider} />
                        {/* Provider selector */}
                        <select
                            className={styles.providerSelect}
                            value={provider}
                            onChange={(e) => setProvider(e.target.value as LLMProviderName)}
                            disabled={isFormatting}
                            id="llm-provider-select"
                        >
                            {providers.length > 0 ? (
                                providers.map(p => (
                                    <option key={p.name} value={p.name} disabled={!p.available}>
                                        {p.label} {!p.available ? '(no key)' : ''}
                                    </option>
                                ))
                            ) : (
                                <>
                                    <option value="gemini">Gemini (Google)</option>
                                    <option value="openai">OpenAI</option>
                                    <option value="claude">Claude (Anthropic)</option>
                                    <option value="openrouter">OpenRouter</option>
                                    <option value="lmstudio">LM Studio (Local)</option>
                                    <option value="ollama">Ollama (Local)</option>
                                </>
                            )}
                        </select>

                        {/* Model indicator */}
                        {lastModel && (
                            <span className={styles.modelBadge} title={`Last used: ${lastModel}`}>
                                {lastModel}
                            </span>
                        )}

                        {/* Formatting indicator */}
                        {isFormatting && (
                            <span className={styles.formattingIndicator}>
                                <span className={styles.spinDot} />
                            </span>
                        )}
                    </>
                )}
            </div>

            <div className={styles.rightSection}>
                <button className={styles.saveBtn}>
                    <AnimatedIcon icon="save" className={styles.icon} /> Save
                </button>
                <button className={styles.aiBtn}>
                    <AnimatedIcon icon="verified" className={styles.icon} /> Run AI Checks
                </button>
                <div className={styles.avatar}>
                    <Image 
                        className="" 
                        alt="Professional advocate" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAnnQU1i0FHqyxPavnDwkE79hvJWy6VCE0hpZlxxu0RitpIrgaxyDVVuuBp9aDksm4aj35UAww_QvSlCLQuXNDhoBzQp94gjIte-g4zNpVJBrud3dqZ6lSo4t_F2APP5Iy1wfFfvPbj0czugQ1_yIElrghFPdt7sLRXQYBd_c1tqDHivQbMPxX2DS2X2xP7Gs4dfkw_lfskfLFdMm0iuHVzSaBoOCJD4pPvlQIrpsI8XnVLU7PxhfyTQooNERFXxbwyvYWerrKuOg" 
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </header>
    );
}
