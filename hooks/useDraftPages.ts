/**
 * UseDraftPages Hook
 * Manages pages within a draft document
 */

import { useState, useCallback } from 'react';
import { Draft, DraftPage, PageNavigation, DocumentType } from '@nakprc/types/draft';
import { v4 as uuidv4 } from 'uuid';

export function useDraftPages(initialTitle = 'Untitled Draft', initialType: DocumentType = 'Other') {
    const [draft, setDraft] = useState<Draft>({
        id: uuidv4(),
        title: initialTitle,
        documentType: initialType,
        status: 'draft',
        pages: [
            {
                id: uuidv4(),
                content: '',
                pageNumber: 1,
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        modifiedAt: new Date(),
        metadata: {},
    });

    const [currentPage, setCurrentPage] = useState(0);

    // Get current page
    const getCurrentPage = useCallback(() => {
        return draft.pages[currentPage];
    }, [draft.pages, currentPage]);

    // Add a new empty page
    const addPage = useCallback(() => {
        const newPage: DraftPage = {
            id: uuidv4(),
            content: '',
            pageNumber: draft.pages.length + 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
        };

        setDraft(prev => ({
            ...prev,
            pages: [...prev.pages, newPage],
            modifiedAt: new Date(),
        }));

        setCurrentPage(draft.pages.length);
    }, [draft.pages.length]);

    // Delete a page
    const deletePage = useCallback((pageIndex: number) => {
        if (draft.pages.length <= 1) return;

        const newPages = draft.pages.filter((_, index) => index !== pageIndex);

        // Re-index pages
        const reindexedPages = newPages.map((page, index) => ({
            ...page,
            pageNumber: index + 1,
        }));

        setDraft(prev => ({
            ...prev,
            pages: reindexedPages,
            modifiedAt: new Date(),
        }));

        // If we deleted the current page, move to previous or next
        if (pageIndex === currentPage) {
            setCurrentPage(Math.min(currentPage, newPages.length - 2));
        }
    }, [draft.pages, currentPage]);

    // Update current page content
    const updateCurrentPageContent = useCallback((content: string) => {
        setDraft(prev => ({
            ...prev,
            pages: prev.pages.map((page, index) =>
                index === currentPage
                    ? { ...page, content, modifiedAt: new Date() }
                    : page
            ),
            modifiedAt: new Date(),
        }));
    }, [currentPage]);

    // Navigate to page
    const goToPage = useCallback((pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < draft.pages.length) {
            setCurrentPage(pageIndex);
        }
    }, [draft.pages.length]);

    // Move to next page
    const nextPage = useCallback(() => {
        if (currentPage < draft.pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, draft.pages.length]);

    // Move to previous page
    const previousPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage]);

    // Update draft title
    const updateTitle = useCallback((title: string) => {
        setDraft(prev => ({ ...prev, title, modifiedAt: new Date() }));
    }, []);

    // Update document type
    const updateDocumentType = useCallback((type: DocumentType) => {
        setDraft(prev => ({ ...prev, documentType: type, modifiedAt: new Date() }));
    }, []);

    // Set page status
    const updateStatus = useCallback((status: 'draft' | 'final' | 'archived') => {
        setDraft(prev => ({ ...prev, status, modifiedAt: new Date() }));
    }, []);

    // Calculate navigation state
    const navigation: PageNavigation = {
        currentPage: currentPage + 1,
        totalPages: draft.pages.length,
        hasPrevious: currentPage > 0,
        hasNext: currentPage < draft.pages.length - 1,
    };

    return {
        draft,
        currentPage,
        getCurrentPage,
        addPage,
        deletePage,
        updateCurrentPageContent,
        goToPage,
        nextPage,
        previousPage,
        updateTitle,
        updateDocumentType,
        updateStatus,
        navigation,
    };
}