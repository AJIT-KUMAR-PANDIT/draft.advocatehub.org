import React from 'react';
import styles from './AICheckOrchestrator.module.scss';
import Sidebar from '@nakprc/components/Shared/Sidebar/Sidebar';
import AICheckHeader from './AICheckHeader/AICheckHeader';
import DocumentViewer from './DocumentViewer/DocumentViewer';
import QualitySidebar from './QualitySidebar/QualitySidebar';
import AIReviewToolbar from './AIReviewToolbar/AIReviewToolbar';

export default function AICheckOrchestrator() {
    return (
        <div className={styles.layout}>
            <Sidebar activeTab="ai_insights" />

            <div className={styles.shell}>
                <AICheckHeader />

                <main className={styles.main}>
                    <DocumentViewer />
                </main>

                <QualitySidebar />
            </div>

            <AIReviewToolbar />
        </div>
    );
}
