'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './EnhancedFlipbook.module.scss';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import A4PagePreview from '../A4PagePreview/A4PagePreview';

interface EnhancedFlipbookProps {
    content: string;
    title?: string;
    editable?: boolean;
    autoFlip?: boolean;
}

interface FlipbookPage {
    id: number;
    content: string;
    pageNumber: number;
    isEditable?: boolean;
}

const PAGE_CHARACTER_LIMIT = 2200;
const PAGE_PARAGRAPH_LIMIT = 9;
const PARAGRAPH_CHUNK_LIMIT = 700;

function splitLongParagraph(paragraph: string, maxLength: number) {
    if (paragraph.length <= maxLength) {
        return [paragraph];
    }

    const words = paragraph.split(/\s+/).filter(Boolean);
    const chunks: string[] = [];
    let currentChunk = '';

    words.forEach((word) => {
        const nextChunk = currentChunk ? `${currentChunk} ${word}` : word;

        if (nextChunk.length > maxLength && currentChunk) {
            chunks.push(currentChunk);
            currentChunk = word;
            return;
        }

        if (word.length > maxLength) {
            if (currentChunk) {
                chunks.push(currentChunk);
                currentChunk = '';
            }

            for (let index = 0; index < word.length; index += maxLength) {
                chunks.push(word.slice(index, index + maxLength));
            }
            return;
        }

        currentChunk = nextChunk;
    });

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

function paginateContent(content: string, editable: boolean): FlipbookPage[] {
    const paragraphs = content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    if (paragraphs.length === 0) {
        return [];
    }

    const pages: FlipbookPage[] = [];
    let currentPageParagraphs: string[] = [];
    let currentPageLength = 0;

    const pushPage = () => {
        if (currentPageParagraphs.length === 0) {
            return;
        }

        pages.push({
            id: pages.length,
            content: currentPageParagraphs.join('\n\n'),
            pageNumber: pages.length + 1,
            isEditable: editable,
        });

        currentPageParagraphs = [];
        currentPageLength = 0;
    };

    paragraphs.forEach((paragraph) => {
        const paragraphChunks = splitLongParagraph(paragraph, PARAGRAPH_CHUNK_LIMIT);

        paragraphChunks.forEach((chunk) => {
            const separatorLength = currentPageParagraphs.length > 0 ? 2 : 0;
            const exceedsLength = currentPageLength + chunk.length + separatorLength > PAGE_CHARACTER_LIMIT;
            const exceedsParagraphs = currentPageParagraphs.length >= PAGE_PARAGRAPH_LIMIT;

            if ((exceedsLength || exceedsParagraphs) && currentPageParagraphs.length > 0) {
                pushPage();
            }

            currentPageParagraphs.push(chunk);
            currentPageLength += chunk.length + (currentPageParagraphs.length > 1 ? 2 : 0);
        });
    });

    pushPage();
    return pages;
}

export default function EnhancedFlipbook({
    content,
    title = 'Legal Document',
    editable = true,
    autoFlip = false
}: EnhancedFlipbookProps) {
    const [pages, setPages] = useState<FlipbookPage[]>([]);
    const [currentFlipIndex, setCurrentFlipIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const autoFlipRef = useRef<NodeJS.Timeout | null>(null);
    const flipbookRef = useRef<HTMLDivElement>(null);

    // Split content into A4-sized pages instead of scrolling inside a single page.
    useEffect(() => {
        if (!content || content.trim().length === 0) {
            setPages([]);
            return;
        }

        setPages(paginateContent(content, editable));
        setCurrentFlipIndex(0);
        setIsComplete(false);
    }, [content, editable]);

    const handleNextPage = useCallback(() => {
        if (currentFlipIndex < pages.length - 1) {
            const nextIndex = currentFlipIndex + 1;
            setIsFlipping(true);
            setCurrentFlipIndex(nextIndex);

            setTimeout(() => {
                setIsFlipping(false);
                if (nextIndex === pages.length - 1) {
                    setIsComplete(true);
                }
            }, 800);
        }
    }, [currentFlipIndex, pages.length]);

    // Auto-flip functionality
    useEffect(() => {
        if (autoFlip && pages.length > 1 && !isFlipping && !isComplete) {
            autoFlipRef.current = setTimeout(() => {
                handleNextPage();
            }, 2500);
        }

        return () => {
            if (autoFlipRef.current) {
                clearTimeout(autoFlipRef.current);
            }
        };
    }, [autoFlip, handleNextPage, isComplete, isFlipping, pages.length]);

    const handlePrevPage = () => {
        if (currentFlipIndex > 0) {
            setIsFlipping(true);
            setCurrentFlipIndex(prev => prev - 1);

            setTimeout(() => {
                setIsFlipping(false);
                setIsComplete(false);
            }, 800);
        }
    };

    const handleReset = () => {
        setCurrentFlipIndex(0);
        setIsComplete(false);
    };

    const handleGoToPage = (pageIndex: number) => {
        setCurrentFlipIndex(pageIndex);
        setIsComplete(pageIndex === pages.length - 1);
    };

    const handleSaveEdit = (pageId: number, newContent: string) => {
        const updatedPages = pages.map(page =>
            page.id === pageId
                ? { ...page, content: newContent }
                : page
        );
        const combinedContent = updatedPages.map(page => page.content).join('\n\n');
        setPages(paginateContent(combinedContent, editable));
    };

    const handleDownloadPDF = async () => {
        if (isDownloading || !flipbookRef.current) return;

        setIsDownloading(true);

        const element = flipbookRef.current;
        const html2pdf = (await import('html2pdf.js')).default as unknown as {
            () : {
                set: (options: unknown) => {
                    from: (source: HTMLElement) => {
                        save: () => Promise<void>;
                    };
                };
            };
        };
        const opt = {
            margin: 10,
            filename: `${title.replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        try {
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleDownloadDOCX = async () => {
        if (isDownloading) return;

        setIsDownloading(true);

        try {
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: pages.map((page, index) => {
                        const textContent = page.content.replace(/\n/g, ' ');
                        return new Paragraph({
                            text: `${page.pageNumber}. ${textContent}`,
                            heading: index === 0 ? 'Heading1' : undefined,
                            spacing: {
                                after: 400,
                            },
                        });
                    })
                }]
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `${title.replace(/\s+/g, '_')}.docx`);
        } catch (error) {
            console.error('Error generating DOCX:', error);
        } finally {
            setIsDownloading(false);
        }
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
        <div ref={flipbookRef} className={styles.flipbookContainer}>
            {/* Flipbook Header */}
            <div className={styles.flipbookHeader}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.headerActions}>
                    <div className={styles.pageIndicator}>
                        <span>{currentFlipIndex + 1}</span>
                        <span className={styles.separator}>/</span>
                        <span>{pages.length}</span>
                    </div>
                    <div className={styles.downloadActions}>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isDownloading}
                            className={`${styles.downloadBtn} ${styles.pdfBtn}`}
                            title="Download as PDF"
                        >
                            <span>PDF</span>
                            {isDownloading && <span className={styles.loading}>...</span>}
                        </button>
                        <button
                            onClick={handleDownloadDOCX}
                            disabled={isDownloading}
                            className={`${styles.downloadBtn} ${styles.docxBtn}`}
                            title="Download as DOCX"
                        >
                            <span>DOCX</span>
                            {isDownloading && <span className={styles.loading}>...</span>}
                        </button>
                    </div>
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
                    onClick={handleReset}
                    className={`${styles.controlBtn} ${styles.resetBtn}`}
                >
                    <span>🔄</span>
                    <span>Reset</span>
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
                                    isEditable={page.isEditable}
                                    isEditing={false}
                                    onSaveEdit={(newContent) => handleSaveEdit(page.id, newContent)}
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
                            onClick={() => handleGoToPage(index)}
                            className={`${styles.dot} ${index === currentFlipIndex ? styles.active : ''
                            }`}
                            title={`Go to page ${index + 1}`}
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
