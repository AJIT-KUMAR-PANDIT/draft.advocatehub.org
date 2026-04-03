import React from 'react';
import NewDraftOrchestrator from '@nakprc/components/NewDraft/NewDraftOrchestrator';

export const metadata = {
    title: 'Draft.AdvocateHub | New Draft Request',
    description: 'Initialize a new legal document draft with AI-assisted configuration',
};

export default function NewDraftPage() {
    return <NewDraftOrchestrator />;
}
