'use client';

import React, { useRef, useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WYSIWYGEditor.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export interface WYSIWYGEditorRef {
    insertText: (text: string) => void;
    insertHTML: (html: string) => void;
    getHTML: () => string;
    focus: () => void;
}

interface ToolbarButton {
    icon: string;
    command: string;
    label: string;
    value?: string;
}

const TOOLBAR_GROUPS: ToolbarButton[][] = [
    [
        { icon: 'B', command: 'bold', label: 'Bold' },
        { icon: 'I', command: 'italic', label: 'Italic' },
        { icon: 'U', command: 'underline', label: 'Underline' },
        { icon: 'S', command: 'strikeThrough', label: 'Strikethrough' },
    ],
    [
        { icon: 'H1', command: 'formatBlock', label: 'Heading 1', value: 'h1' },
        { icon: 'H2', command: 'formatBlock', label: 'Heading 2', value: 'h2' },
        { icon: 'H3', command: 'formatBlock', label: 'Heading 3', value: 'h3' },
        { icon: '¶', command: 'formatBlock', label: 'Paragraph', value: 'p' },
    ],
    [
        { icon: '•', command: 'insertUnorderedList', label: 'Bullet List' },
        { icon: '1.', command: 'insertOrderedList', label: 'Numbered List' },
        { icon: '❝', command: 'formatBlock', label: 'Blockquote', value: 'blockquote' },
    ],
    [
        { icon: '←', command: 'justifyLeft', label: 'Align Left' },
        { icon: '≡', command: 'justifyCenter', label: 'Align Center' },
        { icon: '→', command: 'justifyRight', label: 'Align Right' },
        { icon: '⇔', command: 'justifyFull', label: 'Justify' },
    ],
    [
        { icon: '↩', command: 'undo', label: 'Undo' },
        { icon: '↪', command: 'redo', label: 'Redo' },
    ],
];

const FONT_SIZES = ['1', '2', '3', '4', '5', '6', '7'];
const FONT_FAMILIES = [
    { label: 'Newsreader', value: 'Newsreader, serif' },
    { label: 'Manrope', value: 'Manrope, sans-serif' },
    { label: 'Space Grotesk', value: 'Space Grotesk, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
];

const HIGHLIGHT_COLORS = [
    { label: 'None', value: 'transparent' },
    { label: 'Yellow', value: '#fef08a' },
    { label: 'Green', value: '#bbf7d0' },
    { label: 'Blue', value: '#bfdbfe' },
    { label: 'Pink', value: '#fbcfe8' },
    { label: 'Orange', value: '#fed7aa' },
];

const TEXT_COLORS = [
    { label: 'Default', value: '#1c1c19' },
    { label: 'Primary', value: '#000000' },
    { label: 'Secondary', value: '#755b00' },
    { label: 'Red', value: '#ba1a1a' },
    { label: 'Blue', value: '#1d4ed8' },
    { label: 'Green', value: '#15803d' },
    { label: 'Purple', value: '#7c3aed' },
];

const WYSIWYGEditor = forwardRef<WYSIWYGEditorRef>(function WYSIWYGEditor(_, ref) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [showColorPicker, setShowColorPicker] = useState<'text' | 'highlight' | null>(null);
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    // Expose methods for parent to insert dictated text
    useImperativeHandle(ref, () => ({
        insertText: (text: string) => {
            if (!editorRef.current) return;
            editorRef.current.focus();
            // Insert at cursor position
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                // Move cursor to end of inserted text
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                editorRef.current.innerHTML += text;
            }
            updateCounts();
        },
        insertHTML: (html: string) => {
            if (!editorRef.current) return;
            editorRef.current.focus();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                // Create a temporary container to parse HTML
                const temp = document.createElement('div');
                temp.innerHTML = html;
                const fragment = document.createDocumentFragment();
                let lastNode: Node | null = null;
                while (temp.firstChild) {
                    lastNode = fragment.appendChild(temp.firstChild);
                }
                range.insertNode(fragment);
                // Move cursor after the inserted content
                if (lastNode) {
                    range.setStartAfter(lastNode);
                    range.setEndAfter(lastNode);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } else {
                editorRef.current.innerHTML += html;
            }
            updateCounts();
        },
        getHTML: () => editorRef.current?.innerHTML || '',
        focus: () => editorRef.current?.focus(),
    }));

    const execCommand = useCallback((command: string, value?: string) => {
        if (command === 'formatBlock' && value) {
            document.execCommand(command, false, `<${value}>`);
        } else {
            document.execCommand(command, false, value || '');
        }
        editorRef.current?.focus();
        updateActiveFormats();
    }, []);

    const updateActiveFormats = useCallback(() => {
        const formats = new Set<string>();
        if (document.queryCommandState('bold')) formats.add('bold');
        if (document.queryCommandState('italic')) formats.add('italic');
        if (document.queryCommandState('underline')) formats.add('underline');
        if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough');
        if (document.queryCommandState('insertUnorderedList')) formats.add('insertUnorderedList');
        if (document.queryCommandState('insertOrderedList')) formats.add('insertOrderedList');
        if (document.queryCommandState('justifyLeft')) formats.add('justifyLeft');
        if (document.queryCommandState('justifyCenter')) formats.add('justifyCenter');
        if (document.queryCommandState('justifyRight')) formats.add('justifyRight');
        if (document.queryCommandState('justifyFull')) formats.add('justifyFull');
        setActiveFormats(formats);
    }, []);

    const updateCounts = useCallback(() => {
        if (!editorRef.current) return;
        const text = editorRef.current.innerText || '';
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        setWordCount(words.length);
        setCharCount(text.length);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        // Keyboard shortcuts
        if (e.metaKey || e.ctrlKey) {
            switch (e.key) {
                case 'b': e.preventDefault(); execCommand('bold'); break;
                case 'i': e.preventDefault(); execCommand('italic'); break;
                case 'u': e.preventDefault(); execCommand('underline'); break;
                case 's':
                    e.preventDefault();
                    setLastSaved(new Date().toLocaleTimeString());
                    break;
            }
        }
        // Tab for indent
        if (e.key === 'Tab') {
            e.preventDefault();
            execCommand('insertHTML', '&emsp;');
        }
    }, [execCommand]);

    const handleInput = useCallback(() => {
        updateCounts();
        updateActiveFormats();
    }, [updateCounts, updateActiveFormats]);

    // Set initial default content
    useEffect(() => {
        if (editorRef.current && !editorRef.current.innerHTML.trim()) {
            editorRef.current.innerHTML = '<p><br></p>';
        }
    }, []);

    // Close color picker on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (showColorPicker && !(e.target as HTMLElement).closest(`.${styles.colorPickerWrap}`)) {
                setShowColorPicker(null);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [showColorPicker]);

    return (
        <div className={styles.editorWrapper}>
            {/* Toolbar */}
            <div className={styles.toolbar} id="wysiwyg-toolbar">
                {/* Font family selector */}
                <select 
                    className={styles.fontSelect}
                    onChange={(e) => execCommand('fontName', e.target.value)}
                    defaultValue="Newsreader, serif"
                    id="font-family-select"
                >
                    {FONT_FAMILIES.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                </select>

                {/* Font size selector */}
                <select 
                    className={styles.sizeSelect}
                    onChange={(e) => execCommand('fontSize', e.target.value)}
                    defaultValue="3"
                    id="font-size-select"
                >
                    {FONT_SIZES.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <div className={styles.toolbarDivider} />

                {/* Format button groups */}
                {TOOLBAR_GROUPS.map((group, gi) => (
                    <React.Fragment key={gi}>
                        <div className={styles.btnGroup}>
                            {group.map((btn) => (
                                <motion.button
                                    key={btn.command + (btn.value || '')}
                                    className={`${styles.toolBtn} ${activeFormats.has(btn.command) ? styles.active : ''}`}
                                    onClick={() => execCommand(btn.command, btn.value)}
                                    title={btn.label}
                                    whileTap={{ scale: 0.9 }}
                                    id={`toolbar-${btn.command}-${btn.value || ''}`}
                                >
                                    {btn.icon}
                                </motion.button>
                            ))}
                        </div>
                        {gi < TOOLBAR_GROUPS.length - 1 && <div className={styles.toolbarDivider} />}
                    </React.Fragment>
                ))}

                <div className={styles.toolbarDivider} />

                {/* Color pickers */}
                <div className={styles.colorPickerWrap}>
                    <button
                        className={styles.toolBtn}
                        onClick={(e) => { e.stopPropagation(); setShowColorPicker(showColorPicker === 'text' ? null : 'text'); }}
                        title="Text Color"
                        id="toolbar-text-color"
                    >
                        <span className={styles.colorA}>A</span>
                    </button>
                    <AnimatePresence>
                        {showColorPicker === 'text' && (
                            <motion.div
                                className={styles.colorDropdown}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {TEXT_COLORS.map(c => (
                                    <button
                                        key={c.value}
                                        className={styles.colorSwatch}
                                        style={{ background: c.value }}
                                        title={c.label}
                                        onClick={() => { execCommand('foreColor', c.value); setShowColorPicker(null); }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.colorPickerWrap}>
                    <button
                        className={styles.toolBtn}
                        onClick={(e) => { e.stopPropagation(); setShowColorPicker(showColorPicker === 'highlight' ? null : 'highlight'); }}
                        title="Highlight"
                        id="toolbar-highlight"
                    >
                        <AnimatedIcon icon="format_paint" className={styles.paintIcon} />
                    </button>
                    <AnimatePresence>
                        {showColorPicker === 'highlight' && (
                            <motion.div
                                className={styles.colorDropdown}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {HIGHLIGHT_COLORS.map(c => (
                                    <button
                                        key={c.value}
                                        className={styles.colorSwatch}
                                        style={{ background: c.value === 'transparent' ? '#f0f0f0' : c.value }}
                                        title={c.label}
                                        onClick={() => { execCommand('hiliteColor', c.value); setShowColorPicker(null); }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.toolbarDivider} />

                {/* Insert link */}
                <button
                    className={styles.toolBtn}
                    onClick={() => {
                        const url = prompt('Enter URL:');
                        if (url) execCommand('createLink', url);
                    }}
                    title="Insert Link"
                    id="toolbar-link"
                >
                    🔗
                </button>

                {/* Remove formatting */}
                <button
                    className={styles.toolBtn}
                    onClick={() => execCommand('removeFormat')}
                    title="Clear Formatting"
                    id="toolbar-clear-format"
                >
                    <AnimatedIcon icon="format_paint" className={styles.clearFormatIcon} />
                    ✕
                </button>
            </div>

            {/* Edit area */}
            <div
                ref={editorRef}
                className={styles.editArea}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onSelect={updateActiveFormats}
                onClick={updateActiveFormats}
                role="textbox"
                aria-multiline="true"
                aria-label="Document editor"
                id="wysiwyg-content-area"
                data-placeholder="Start typing or use voice dictation..."
            />

            {/* Status bar */}
            <div className={styles.statusBar}>
                <div className={styles.statusLeft}>
                    <span className={styles.statItem}>{wordCount} words</span>
                    <span className={styles.statDivider}>•</span>
                    <span className={styles.statItem}>{charCount} characters</span>
                </div>
                <div className={styles.statusRight}>
                    {lastSaved && (
                        <motion.span
                            className={styles.savedLabel}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <AnimatedIcon icon="check_circle" className={styles.savedIcon} />
                            Saved {lastSaved}
                        </motion.span>
                    )}
                    <span className={styles.statItem}>
                        <kbd className={styles.kbd}>⌘B</kbd> Bold
                        <kbd className={styles.kbd}>⌘I</kbd> Italic
                        <kbd className={styles.kbd}>⌘U</kbd> Underline
                    </span>
                </div>
            </div>
        </div>
    );
});

export default WYSIWYGEditor;
