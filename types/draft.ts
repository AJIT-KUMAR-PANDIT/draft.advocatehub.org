/**
 * Draft Page Types
 * Manages individual pages within a legal document
 */

export interface DraftPage {
    id: string;
    content: string;
    pageNumber: number;
    createdAt: Date;
    modifiedAt: Date;
}

export interface Draft {
    id: string;
    title: string;
    documentType: string;
    status: 'draft' | 'final' | 'archived';
    pages: DraftPage[];
    createdAt: Date;
    modifiedAt: Date;
    metadata: Record<string, any>;
}

export type DocumentType = 'NDA' | 'Employment Agreement' | 'Service Agreement' | 'Letter' | 'Memo' | 'Other';

export interface PageNavigation {
    currentPage: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}