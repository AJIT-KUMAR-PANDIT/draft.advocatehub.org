import React from 'react';
import styles from './AICheckOrchestrator.module.scss';
import Sidebar from '@nakprc/components/Shared/Sidebar/Sidebar';
import AICheckHeader from './AICheckHeader/AICheckHeader';
import DocumentViewer from './DocumentViewer/DocumentViewer';
import QualitySidebar from './QualitySidebar/QualitySidebar';
import AIReviewToolbar from './AIReviewToolbar/AIReviewToolbar';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Link from 'next/link';

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

            {/* Mobile Navigation bar */}
            <nav className={styles.mobileNav}>
                <Link href="/dashboard" className={styles.navItem}>
                    <AnimatedIcon icon="home" className={styles.icon} />
                    <span className={styles.label}>Home</span>
                </Link>
                <Link href="#" className={styles.navItemActive}>
                    <AnimatedIcon icon="verified" className={styles.icon} />
                    <span className={styles.label}>AI Check</span>
                </Link>
                <Link href="/editor" className={styles.navItem}>
                    <AnimatedIcon icon="description" className={styles.icon} />
                    <span className={styles.label}>Drafts</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="person" className={styles.icon} />
                    <span className={styles.label}>Profile</span>
                </Link>
            </nav>
        </div>
    );
}
