import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <span className={styles.title}>The Atelier</span>
                <p className={styles.subtitle}>Senior Advocate</p>
            </div>
            
            <nav className={styles.nav}>
                <Link href="#" className={`${styles.navItem} ${styles.active}`}>
                    <AnimatedIcon icon="dashboard" className={styles.icon} />
                    <span className={styles.label}>Dashboard</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="folder_open" className={styles.icon} />
                    <span className={styles.label}>Case Files</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="edit_note" className={styles.icon} />
                    <span className={styles.label}>Drafting Room</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="auto_awesome" className={styles.icon} />
                    <span className={styles.label}>AI Insights</span>
                </Link>
                <Link href="#" className={styles.navItem}>
                    <AnimatedIcon icon="inventory_2" className={styles.icon} />
                    <span className={styles.label}>Archive</span>
                </Link>
            </nav>
            
            <div className={styles.footer}>
                <button className={styles.newButton}>
                    <AnimatedIcon icon="add" className={styles.icon} />
                    New Draft
                </button>
                <div className={styles.footerLinks}>
                    <Link href="#" className={styles.navItem}>
                        <AnimatedIcon icon="help_outline" className={styles.icon} />
                        <span className={styles.label}>Support</span>
                    </Link>
                    <Link href="#" className={styles.navItem}>
                        <AnimatedIcon icon="logout" className={styles.icon} />
                        <span className={styles.label}>Sign Out</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
