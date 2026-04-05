'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from './LLMTextInput.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

interface LLMTextInputProps {
    onSubmit: (text: string) => Promise<void>;
    isFormatting: boolean;
    providerLabel: string;
    onVoiceToggle: () => void;
    isVoiceListening: boolean;
}

export default function LLMTextInput({
    onSubmit,
    isFormatting,
    providerLabel,
    onVoiceToggle,
    isVoiceListening,
}: LLMTextInputProps) {
    const [text, setText] = useState('');

    const handleSubmit = useCallback(async () => {
        if (!text.trim() || isFormatting) return;
        const submittedText = text;
        setText('');
        await onSubmit(submittedText);
    }, [text, isFormatting, onSubmit]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }, []);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className={styles.shell}>
                <div className={styles.iconGroup}>
                    <span className={styles.aiIconWrap}>
                        <AnimatedIcon icon="auto_awesome" className={styles.aiIcon} />
                    </span>
                    <button
                        type="button"
                        className={`${styles.voiceBtn} ${isVoiceListening ? styles.voiceBtnActive : ''}`}
                        onClick={onVoiceToggle}
                        aria-label={isVoiceListening ? 'Stop Voice Search' : 'Voice Search'}
                        id="llm-text-input-voice"
                    >
                        <AnimatedIcon
                            icon={isVoiceListening ? 'pause' : 'keyboard_voice'}
                            className={styles.voiceIcon}
                        />
                    </button>
                </div>

                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        className={styles.input}
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask the Digital Architect..."
                        disabled={isFormatting}
                        id="llm-text-input-area"
                    />
                </div>

                <div className={styles.submitWrap}>
                    <button
                        type="button"
                        className={`${styles.submitBtn} ${!text.trim() || isFormatting ? styles.disabled : ''}`}
                        onClick={handleSubmit}
                        disabled={!text.trim() || isFormatting}
                        id="llm-text-input-submit"
                        aria-label="Send request"
                    >
                        <AnimatedIcon icon="arrow_upward" className={styles.submitIcon} />
                    </button>
                </div>
            </div>

            {(isFormatting || isVoiceListening) && (
                <div className={styles.statusBar}>
                    {isFormatting && (
                        <motion.span
                            className={styles.formattingLabel}
                            animate={{ opacity: [0.55, 1, 0.55] }}
                            transition={{ repeat: Infinity, duration: 1.4 }}
                        >
                            <span className={styles.spinnerDot} />
                            Formatting via {providerLabel}
                        </motion.span>
                    )}
                    {isVoiceListening && <span className={styles.voiceStatus}>Voice dictation live</span>}
                </div>
            )}
        </motion.div>
    );
}
