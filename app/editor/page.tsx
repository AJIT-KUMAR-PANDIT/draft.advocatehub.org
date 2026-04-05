import type { Metadata } from 'next';
import EditorOrchestrator from '@nakprc/components/Editor/EditorOrchestrator';

export const metadata: Metadata = {
    title: 'Draft.AdvocateHub | Voice Dictation Editor',
    description: 'Advanced voice-driven legal document editor with WYSIWYG formatting and real-time speech recognition',
};

export default function EditorPage() {
    return <EditorOrchestrator />;
}
