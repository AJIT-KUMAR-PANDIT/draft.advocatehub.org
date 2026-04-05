'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Flipbook.module.scss';
import A4PagePreview from '../A4PagePreview/A4PagePreview';

interface FlipbookProps {
    content: string;
    title?: string;
    autoFlip?: boolean;
}

export default function Flipbook({ content, title = 'Legal Document', autoFlip = false }: FlipbookProps) {
    const [pages, setPages] = useState<Array<{ id: number; content: string; pageNumber: number }>>([]);
    const [currentFlipIndex, setCurrentFlipIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const autoFlipRef = useRef<NodeJS.Timeout | null>(null);

    // Split content into pages based on character count
    useEffect(() => {
        if (!content || content.trim().length === 0) {
            setPages([]);
            return;
        }

        const PAGE_CHARACTER_LIMIT = 3000;
        const pagesData: Array<{ id: number; content: string; pageNumber: number }> = [];
        let currentPageContent = '';
        let currentPageNumber = 1;

        content.split('\n').forEach((paragraph, index) => {
            const paragraphLength = paragraph.length;
            const totalLength = currentPageContent.length + paragraphLength;

            if (totalLength > PAGE_CHARACTER_LIMIT && currentPageContent.length > 0) {
                pagesData.push({
                    id: index,
                    content: currentPageContent,
                    pageNumber: currentPageNumber
                });
                currentPageContent = '';
                currentPageNumber++;
            }

            currentPageContent += paragraph + '\n';
        });

        // Add the last page if it has content
        if (currentPageContent.trim().length > 0) {
            pagesData.push({
                id: pagesData.length,
                content: currentPageContent,
                pageNumber: currentPageNumber
            });
        }

        setPages(pagesData);
        setCurrentFlipIndex(0);
        setIsComplete(false);
    }, [content]);

    // Auto-flip functionality
    useEffect(() => {
        if (autoFlip && pages.length > 1 && !isFlipping && !isComplete) {
            autoFlipRef.current = setTimeout(() => {
                handleNextPage();
            }, 3000);
        }

        return () => {
            if (autoFlipRef.current) {
                clearTimeout(autoFlipRef.current);
            }
        };
    }, [pages, currentFlipIndex, isFlipping, isComplete, autoFlip]);

    const handleNextPage = () => {
        if (currentFlipIndex < pages.length - 1) {
            setIsFlipping(true);
            setCurrentFlipIndex(prev => prev + 1);

            setTimeout(() => {
                setIsFlipping(false);
                if (currentFlipIndex === pages.length - 2) {
                    setIsComplete(true);
                }
            }, 600);
        }
    };

    const handlePrevPage = () => {
        if (currentFlipIndex > 0) {
            setIsFlipping(true);
            setCurrentFlipIndex(prev => prev - 1);

            setTimeout(() => {
                setIsFlipping(false);
                setIsComplete(false);
            }, 600);
        }
    };

    const handleReset = () => {
        setCurrentFlipIndex(0);
        setIsComplete(false);
    };

    if (pages.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.placeholderContent}>
                    <div className={styles.icon}>📄</div>
                    <p>No content to display</p>
                    <p className={styles.subtitle}>Start typing or use voice input to create your document</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.flipbookContainer}>
            <div className={styles.flipbookHeader}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.pageIndicator}>
                    <span>{currentFlipIndex + 1}</span>
                    <span className={styles.separator}>/</span>
                    <span>{pages.length}</span>
                </div>
            </div>

            {/* Flipbook Controls */}
            <div className={styles.controls}>
                <button
                    onClick={handlePrevPage}
                    disabled={currentFlipIndex === 0 || isFlipping}
                    className={`${styles.controlBtn} ${styles.prevBtn}`}
                >
                    <span>←</span>
                    <span>Previous</span>
                </button>

                <button
                    onClick={handleNextPage}
                    disabled={currentFlipIndex === pages.length - 1 || isFlipping || isComplete}
                    className={`${styles.controlBtn} ${styles.nextBtn}`}
                >
                    <span>Next</span>
                    <span>→</span>
                </button>
            </div>

            {/* Flipbook Pages */}
            <div className={styles.flipbookView}>
                <div className={styles.pageStack}>
                    {pages.map((page, index) => {
                        const isFlipped = index < currentFlipIndex;
                        const isCurrent = index === currentFlipIndex;
                        const isNext = index === currentFlipIndex + 1;

                        return (
                            <div
                                key={page.id}
                                className={`${styles.page} ${isFlipped ? styles.flipped : ''} ${isCurrent ? styles.current : ''} ${isNext ? styles.next : ''
                                    }`}
                            >
                                <A4PagePreview
                                    content={page.content}
                                    pageNumber={page.pageNumber}
                                    isFlipped={isFlipped}
                                    onFlipStart={() => setIsFlipping(true)}
                                    onFlipEnd={() => setIsFlipping(false)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Page Navigation Dots */}
            <div className={styles.pageNavigation}>
                {pages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleReset()}
                        className={`${styles.dot} ${index === currentFlipIndex ? styles.active : ''
                            }`}
                    />
                ))}
            </div>

            {/* Completion Message */}
            {isComplete && (
                <div className={styles.completeBanner}>
                    <div className={styles.completeContent}>
                        <span className={styles.checkmark}>✓</span>
                        <span>All pages displayed</span>
                    </div>
                </div>
            )}
        </div>
    );
}