/**
 * A4 Page Preview Component
 * Displays a single page in A4 format with flip book effect
 */

'use client';

import React, { useRef } from 'react';
import styles from './A4PagePreview.module.scss';

interface A4PagePreviewProps {
    content: string;
    pageNumber: number;
    isFlipped?: boolean;
    onFlipStart?: () => void;
    onFlipEnd?: () => void;
    isEditable?: boolean;
    isEditing?: boolean;
    onSaveEdit?: (content: string) => void;
}

export default function A4PagePreview({
    content,
    pageNumber,
    isFlipped = false,
    onFlipStart,
    onFlipEnd,
    isEditable = false,
    isEditing = false,
    onSaveEdit,
}: A4PagePreviewProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    // Handle flip animation
    const handleFlipStart = () => {
        onFlipStart?.();
    };

    const handleFlipEnd = () => {
        onFlipEnd?.();
    };

    // Handle content changes
    const handleContentChange = () => {
        if (contentRef.current && onSaveEdit) {
            const newContent = contentRef.current.innerText;
            onSaveEdit(newContent);
        }
    };

    return (
        <div
            className={`${styles.pageContainer} ${isFlipped ? styles.flipped : ''}`}
        >
            <div
                className={styles.page}
                onTransitionStart={handleFlipStart}
                onTransitionEnd={handleFlipEnd}
            >
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <span className={styles.documentTitle}>Legal Document</span>
                    <span className={styles.pageNumber}>Page {pageNumber}</span>
                </div>

                {/* Page Content */}
                <div
                    ref={contentRef}
                    className={styles.pageContent}
                    contentEditable={isEditable && isEditing}
                    onInput={handleContentChange}
                >
                    <div className={styles.contentBody}>
                        {content.split('\n').map((paragraph, index) => (
                            <p key={index} className={styles.paragraph}>
                                {paragraph}
                            </p>
                        ))}
                        {content === '' && <p className={styles.placeholder}>Start typing or use voice input...</p>}
                    </div>
                </div>

                {/* Page Footer */}
                <div className={styles.pageFooter}>
                    <span className={styles.sectionCount}>{pageNumber} pages</span>
                    <span className={styles.date}>{new Date().toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
