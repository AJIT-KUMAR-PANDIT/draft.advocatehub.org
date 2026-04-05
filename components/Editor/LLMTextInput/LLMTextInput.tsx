'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LLMTextInput.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

interface LLMTextInputProps {
    onSubmit: (text: string) => Promise<void>;
    isFormatting: boolean;
    providerLabel: string;
}

export default function LLMTextInput({ onSubmit, isFormatting, providerLabel }: LLMTextInputProps) {
    const [text, setText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [text]);

    const handleSubmit = useCallback(async () => {
        if (!text.trim() || isFormatting) return;
        const submittedText = text;
        setText('');
        setCharCount(0);
        await onSubmit(submittedText);
    }, [text, isFormatting, onSubmit]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Ctrl/Cmd+Enter to submit
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
        // Escape to collapse
        if (e.key === 'Escape') {
            setIsExpanded(false);
        }
    }, [handleSubmit]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setCharCount(e.target.value.length);
    }, []);

    if (!isExpanded) {
        return (
            <motion.button
                className={styles.triggerBtn}
                onClick={() => {
                    setIsExpanded(true);
                    setTimeout(() => textareaRef.current?.focus(), 100);
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="llm-text-input-trigger"
            >
                <AnimatedIcon icon="edit" className={styles.triggerIcon} />
                <span>Type text to auto-format...</span>
            </motion.button>
        );
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
        >
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <AnimatedIcon icon="edit" className={styles.headerIcon} />
                    <span className={styles.headerTitle}>LLM Text Input</span>
                    <span className={styles.headerHint}>Type or paste → auto-formatted into editor</span>
                </div>
                <button
                    className={styles.closeBtn}
                    onClick={() => setIsExpanded(false)}
                    id="llm-text-input-close"
                >
                    ✕
                </button>
            </div>

            {/* Text area */}
            <div className={styles.inputWrap}>
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type or paste your legal text here... The AI will auto-format it with proper headings, bold legal keywords (WHEREAS, NOW THEREFORE), and structured paragraphs."
                    disabled={isFormatting}
                    rows={3}
                    id="llm-text-input-area"
                />
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    <span className={styles.charCount}>{charCount} chars</span>
                    <span className={styles.shortcut}>
                        <kbd className={styles.kbd}>⌘</kbd>+<kbd className={styles.kbd}>↵</kbd> to submit
                    </span>
                </div>
                <div className={styles.footerRight}>
                    {isFormatting && (
                        <motion.span
                            className={styles.formattingLabel}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <span className={styles.spinnerDot} />
                            Formatting via {providerLabel}...
                        </motion.span>
                    )}
                    <button
                        className={`${styles.submitBtn} ${!text.trim() || isFormatting ? styles.disabled : ''}`}
                        onClick={handleSubmit}
                        disabled={!text.trim() || isFormatting}
                        id="llm-text-input-submit"
                    >
                        <AnimatedIcon icon="auto_awesome" className={styles.submitIcon} />
                        Format & Insert
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
