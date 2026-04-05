'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VoiceInput.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

interface VoiceInputProps {
    onTranscript: (text: string, isFinal: boolean) => void;
    onRecordingStop?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export default function VoiceInput({ onTranscript, onRecordingStop, isCollapsed = false, onToggleCollapse }: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);
    const [interimText, setInterimText] = useState('');
    const [finalText, setFinalText] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [volume, setVolume] = useState(0);
    const [barHeights, setBarHeights] = useState<number[]>(new Array(24).fill(4));
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState('en-IN');

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Audio visualizer
    const startAudioVisualizer = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const audioCtx = new AudioContext();
            audioContextRef.current = audioCtx;
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            analyserRef.current = analyser;
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateBars = () => {
                analyser.getByteFrequencyData(dataArray);
                const bars: number[] = [];
                const step = Math.floor(bufferLength / 24);
                let sumVolume = 0;
                for (let i = 0; i < 24; i++) {
                    const val = dataArray[i * step] || 0;
                    bars.push(Math.max(4, (val / 255) * 48));
                    sumVolume += val;
                }
                setBarHeights(bars);
                setVolume(sumVolume / (24 * 255));
                animFrameRef.current = requestAnimationFrame(updateBars);
            };
            updateBars();
        } catch {
            console.warn('Microphone access not available for visualizer');
        }
    }, []);

    const stopAudioVisualizer = useCallback(() => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (audioContextRef.current) audioContextRef.current.close();
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
        }
        setBarHeights(new Array(24).fill(4));
        setVolume(0);
    }, []);

    const startListening = useCallback(() => {
        setError(null);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interim = '';
            let final = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += transcript + ' ';
                } else {
                    interim += transcript;
                }
            }
            if (final) {
                setFinalText(prev => prev + final);
                onTranscript(final, true);
            }
            setInterimText(interim);
            if (interim) {
                onTranscript(interim, false);
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === 'not-allowed') {
                setError('Microphone access denied. Please allow microphone access.');
            } else if (event.error !== 'aborted') {
                setError(`Speech recognition error: ${event.error}`);
            }
            setIsListening(false);
            stopAudioVisualizer();
        };

        recognition.onend = () => {
            // Auto restart if still in listening mode
            if (recognitionRef.current && isListening) {
                try {
                    recognition.start();
                } catch { /* already started */ }
            }
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
        setElapsedSeconds(0);
        setFinalText('');
        setInterimText('');

        // Start timer
        timerRef.current = setInterval(() => {
            setElapsedSeconds(prev => prev + 1);
        }, 1000);

        startAudioVisualizer();
    }, [language, onTranscript, startAudioVisualizer, stopAudioVisualizer, isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
            recognitionRef.current = null;
        }
        setIsListening(false);
        setInterimText('');
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        stopAudioVisualizer();
        // Notify parent to flush any pending text
        onRecordingStop?.();
    }, [stopAudioVisualizer, onRecordingStop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.abort();
            if (timerRef.current) clearInterval(timerRef.current);
            stopAudioVisualizer();
        };
    }, [stopAudioVisualizer]);

    const languageOptions = [
        { code: 'en-IN', label: 'English (India)' },
        { code: 'en-US', label: 'English (US)' },
        { code: 'hi-IN', label: 'हिन्दी' },
        { code: 'ta-IN', label: 'தமிழ்' },
        { code: 'te-IN', label: 'తెలుగు' },
        { code: 'bn-IN', label: 'বাংলা' },
        { code: 'mr-IN', label: 'मराठी' },
        { code: 'gu-IN', label: 'ગુજરાતી' },
        { code: 'kn-IN', label: 'ಕನ್ನಡ' },
    ];

    if (isCollapsed) {
        return (
            <motion.div 
                className={styles.collapsed}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <button 
                    className={`${styles.micBtnSmall} ${isListening ? styles.active : ''}`}
                    onClick={isListening ? stopListening : startListening}
                    id="voice-toggle-collapsed"
                >
                    <AnimatedIcon icon={isListening ? 'pause' : 'keyboard_voice'} className={styles.micIcon} />
                </button>
                {isListening && (
                    <div className={styles.miniWaveform}>
                        {barHeights.slice(0,8).map((h, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.miniBar}
                                animate={{ height: h * 0.5 }}
                                transition={{ duration: 0.1 }}
                            />
                        ))}
                    </div>
                )}
                {isListening && <span className={styles.miniTimer}>{formatTime(elapsedSeconds)}</span>}
                <button className={styles.expandBtn} onClick={onToggleCollapse} id="voice-expand-btn">
                    <AnimatedIcon icon="expand_more" className={styles.expandIcon} />
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className={styles.container}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.status}>
                        <span className={`${styles.indicator} ${isListening ? styles.active : ''}`} />
                        {isListening ? 'Listening...' : 'Voice Dictation'}
                    </span>
                    {isListening && (
                        <motion.span 
                            className={styles.timer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {formatTime(elapsedSeconds)}
                        </motion.span>
                    )}
                </div>
                <div className={styles.headerRight}>
                    <select 
                        className={styles.langSelect}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={isListening}
                        id="voice-language-select"
                    >
                        {languageOptions.map(l => (
                            <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                    </select>
                    {onToggleCollapse && (
                        <button className={styles.collapseBtn} onClick={onToggleCollapse} id="voice-collapse-btn">
                            <AnimatedIcon icon="arrow_back" className={styles.collapseBtnIcon} />
                        </button>
                    )}
                </div>
            </div>

            {/* Transcript area */}
            <div className={styles.transcript}>
                <AnimatePresence mode="popLayout">
                    {error && (
                        <motion.div 
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <AnimatedIcon icon="error" className={styles.errorIcon} />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isListening && !finalText && !error && (
                    <div className={styles.placeholder}>
                        <motion.div 
                            className={styles.placeholderIcon}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <AnimatedIcon icon="keyboard_voice" className={styles.bigMic} />
                        </motion.div>
                        <p className={styles.placeholderText}>Tap the microphone to start dictating</p>
                        <p className={styles.placeholderHint}>Your speech will be transcribed in real-time and inserted into the editor</p>
                    </div>
                )}

                {(finalText || interimText) && (
                    <div className={styles.transcriptText}>
                        <span className={styles.finalText}>{finalText}</span>
                        {interimText && (
                            <span className={styles.interimText}>{interimText}</span>
                        )}
                        {isListening && <span className={styles.cursor} />}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className={styles.controlsArea}>
                {/* Waveform visualization */}
                <div className={styles.waveform}>
                    {barHeights.map((h, i) => (
                        <motion.div
                            key={i}
                            className={`${styles.bar} ${isListening ? styles.barActive : ''}`}
                            animate={{ height: isListening ? h : 4 }}
                            transition={{ duration: 0.08, ease: 'easeOut' }}
                        />
                    ))}
                </div>

                {/* Volume meter */}
                {isListening && (
                    <motion.div 
                        className={styles.volumeMeter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className={styles.volumeLabel}>Input Level</div>
                        <div className={styles.volumeTrack}>
                            <motion.div 
                                className={styles.volumeFill}
                                animate={{ width: `${Math.min(volume * 100, 100)}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Main control button */}
                <div className={styles.controlRow}>
                    <button
                        className={`${styles.mainBtn} ${isListening ? styles.recording : ''}`}
                        onClick={isListening ? stopListening : startListening}
                        id="voice-main-toggle"
                    >
                        <motion.div
                            className={styles.btnInner}
                            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <AnimatedIcon 
                                icon={isListening ? 'pause' : 'keyboard_voice'} 
                                className={styles.btnIcon} 
                            />
                        </motion.div>
                        {isListening && (
                            <motion.div 
                                className={styles.pulseRing}
                                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                        )}
                    </button>

                    {isListening && (
                        <motion.span 
                            className={styles.recordingLabel}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            Recording...
                        </motion.span>
                    )}
                </div>

                {/* Clear transcript */}
                {finalText && !isListening && (
                    <motion.button
                        className={styles.clearBtn}
                        onClick={() => setFinalText('')}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        id="voice-clear-transcript"
                    >
                        Clear Transcript
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
