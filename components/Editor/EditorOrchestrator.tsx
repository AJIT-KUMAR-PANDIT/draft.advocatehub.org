'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EditorOrchestrator.module.scss';
import Sidebar from '@nakprc/components/Shared/Sidebar/Sidebar';
import EditorHeader from './EditorHeader/EditorHeader';
import VoiceInput from './VoiceInput/VoiceInput';
import WYSIWYGEditor, { WYSIWYGEditorRef } from './WYSIWYGEditor/WYSIWYGEditor';
import MetadataSidebar from './MetadataSidebar/MetadataSidebar';
import FloatingContextBar from './FloatingContextBar/FloatingContextBar';
import LLMTextInput from './LLMTextInput/LLMTextInput';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Link from 'next/link';
import { useAutoFormat } from '@nakprc/hooks/useAutoFormat';

export default function EditorOrchestrator() {
    const [voiceCollapsed, setVoiceCollapsed] = useState(false);
    const editorRef = useRef<WYSIWYGEditorRef>(null);
    const pendingTextRef = useRef<string>('');

    const {
        formatText,
        isFormatting,
        error: formatError,
        clearError,
        provider,
        setProvider,
        providers,
        lastModel,
        autoFormat,
        setAutoFormat,
    } = useAutoFormat();

    // When voice recognition returns final text, auto-format via LLM then insert into WYSIWYG
    const handleTranscript = useCallback(async (text: string, isFinal: boolean) => {
        if (!isFinal || !editorRef.current) return;

        if (!autoFormat) {
            editorRef.current.insertText(text);
            return;
        }

        pendingTextRef.current += text;

        if (pendingTextRef.current.trim().length < 20) return;

        const textToFormat = pendingTextRef.current;
        pendingTextRef.current = '';

        const existingContent = editorRef.current.getHTML();
        const formattedHTML = await formatText(textToFormat, existingContent);

        if (formattedHTML && editorRef.current) {
            editorRef.current.insertHTML(formattedHTML);
        } else if (!formattedHTML && editorRef.current) {
            editorRef.current.insertText(textToFormat);
        }
    }, [autoFormat, formatText]);

    // Force-flush any pending text when recording stops
    const handleRecordingStop = useCallback(async () => {
        if (pendingTextRef.current.trim() && editorRef.current) {
            const textToFormat = pendingTextRef.current;
            pendingTextRef.current = '';

            if (autoFormat) {
                const existingContent = editorRef.current.getHTML();
                const formattedHTML = await formatText(textToFormat, existingContent);
                if (formattedHTML && editorRef.current) {
                    editorRef.current.insertHTML(formattedHTML);
                } else if (editorRef.current) {
                    editorRef.current.insertText(textToFormat);
                }
            } else {
                editorRef.current.insertText(textToFormat);
            }
        }
    }, [autoFormat, formatText]);

    // Handle manual LLM text input submission
    const handleLLMTextSubmit = useCallback(async (text: string) => {
        if (!editorRef.current) return;

        if (!autoFormat) {
            editorRef.current.insertText(text);
            return;
        }

        const existingContent = editorRef.current.getHTML();
        const formattedHTML = await formatText(text, existingContent);

        if (formattedHTML && editorRef.current) {
            editorRef.current.insertHTML(formattedHTML);
        } else if (editorRef.current) {
            editorRef.current.insertText(text);
        }
    }, [autoFormat, formatText]);

    const toggleVoicePanel = useCallback(() => {
        setVoiceCollapsed(prev => !prev);
    }, []);

    const currentProviderLabel = providers.find(p => p.name === provider)?.label || provider;

    return (
        <div className={styles.layout}>
            <Sidebar activeTab="drafting_room" />
            
            <main className={styles.mainContent}>
                <EditorHeader 
                    provider={provider}
                    setProvider={setProvider}
                    providers={providers}
                    autoFormat={autoFormat}
                    setAutoFormat={setAutoFormat}
                    isFormatting={isFormatting}
                    lastModel={lastModel}
                />
                
                <section className={styles.workspace}>
                    {/* Voice Dictation Panel */}
                    <VoiceInput 
                        onTranscript={handleTranscript}
                        onRecordingStop={handleRecordingStop}
                        isCollapsed={voiceCollapsed}
                        onToggleCollapse={toggleVoicePanel}
                    />

                    {/* Center column: Editor + LLM Text Input */}
                    <div className={styles.centerColumn}>
                        {/* WYSIWYG Editor with AI formatting indicator */}
                        <div className={styles.editorContainer}>
                            <AnimatePresence>
                                {isFormatting && (
                                    <motion.div
                                        className={styles.formattingBanner}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className={styles.formattingDot} />
                                        <span>AI formatting via {currentProviderLabel}...</span>
                                    </motion.div>
                                )}
                                {formatError && (
                                    <motion.div
                                        className={styles.errorBanner}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <AnimatedIcon icon="error" className={styles.errorIcon} />
                                        <span>{formatError}</span>
                                        <button onClick={clearError} className={styles.dismissBtn}>✕</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <WYSIWYGEditor ref={editorRef} />
                        </div>

                        {/* LLM Text Input — type/paste text for auto-formatting */}
                        <LLMTextInput
                            onSubmit={handleLLMTextSubmit}
                            isFormatting={isFormatting}
                            providerLabel={currentProviderLabel}
                        />
                    </div>

                    <MetadataSidebar />
                </section>
            </main>

            <FloatingContextBar />

            <nav className={styles.mobileNav}>
                <Link href="/dashboard" className={styles.navItem}>
                    <AnimatedIcon icon="home" className={styles.icon} />
                    <span className={styles.label}>Home</span>
                </Link>
                <Link href="#" className={styles.navItemActive}>
                    <AnimatedIcon icon="description" className={styles.icon} />
                    <span className={styles.label}>Drafts</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="verified" className={styles.icon} />
                    <span className={styles.label}>AI Check</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="person" className={styles.icon} />
                    <span className={styles.label}>Profile</span>
                </Link>
            </nav>
        </div>
    );
}
