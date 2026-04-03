import React from 'react';
import styles from './EditorOrchestrator.module.scss';
import Sidebar from '@nakprc/components/Shared/Sidebar/Sidebar';
import EditorHeader from './EditorHeader/EditorHeader';
import VoiceInput from './VoiceInput/VoiceInput';
import DocumentPreview from './DocumentPreview/DocumentPreview';
import MetadataSidebar from './MetadataSidebar/MetadataSidebar';
import FloatingContextBar from './FloatingContextBar/FloatingContextBar';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Link from 'next/link';

export default function EditorOrchestrator() {
    return (
        <div className={styles.layout}>
            {/* Using the newly shared Sidebar with active tab mapping */}
            <Sidebar activeTab="drafting_room" />
            
            <main className={styles.mainContent}>
                <EditorHeader />
                
                <section className={styles.workspace}>
                    <VoiceInput />
                    <DocumentPreview />
                    <MetadataSidebar />
                </section>
            </main>

            {/* Floating context bar fixed bottom-center */}
            <FloatingContextBar />

            {/* Mobile Navigation bar mapping identical to dashboard but indicating drafts as active */}
            <nav className={styles.mobileNav}>
                <Link href="/dashboard" className={styles.navItem}>
                    <AnimatedIcon icon="home" className={styles.icon} />
                    <span className={styles.label}>Home</span>
                </Link>
                <Link href="#" className={styles.navItemActive}>
                    <AnimatedIcon icon="description" className={styles.icon} />
                    <span className={styles.label}>Drafts</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="verified" className={styles.icon} />
                    <span className={styles.label}>AI Check</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="person" className={styles.icon} />
                    <span className={styles.label}>Profile</span>
                </Link>
            </nav>
        </div>
    );
}
