import React from 'react';
import styles from './NewDraftOrchestrator.module.scss';
import Sidebar from '@nakprc/components/Shared/Sidebar/Sidebar';
import NewDraftHeader from './NewDraftHeader/NewDraftHeader';
import DraftForm from './DraftForm/DraftForm';
import RequestSidebar from './RequestSidebar/RequestSidebar';
import DraftFloatingBar from './DraftFloatingBar/DraftFloatingBar';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Link from 'next/link';

export default function NewDraftOrchestrator() {
    return (
        <div className={styles.root}>
            <NewDraftHeader />
            <Sidebar activeTab="case_files" />

            <div className={styles.body}>
                <main className={styles.main}>
                    <DraftForm />
                    <RequestSidebar />
                </main>
            </div>

            <DraftFloatingBar />

            {/* Mobile Bottom Nav */}
            <nav className={styles.mobileNav}>
                <Link href="/dashboard" className={styles.navItem}>
                    <AnimatedIcon icon="home" />
                    <span className={styles.label}>Home</span>
                </Link>
                <div className={styles.navItemActive}>
                    <AnimatedIcon icon="description" />
                    <span className={styles.label}>Drafts</span>
                </div>
                <Link href="/ai-check" className={styles.navItem}>
                    <AnimatedIcon icon="verified" />
                    <span className={styles.label}>AI Check</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="person" />
                    <span className={styles.label}>Profile</span>
                </Link>
            </nav>
        </div>
    );
}
