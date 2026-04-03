import React from 'react';
import styles from './AIReviewToolbar.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function AIReviewToolbar() {
    return (
        <div className={styles.toolbar}>
            <div className={styles.branding}>
                <span className={styles.icon}><AnimatedIcon icon="auto_awesome" /></span>
                <span className={styles.label}>Smart Review Active</span>
            </div>
            <div className={styles.actions}>
                <button className={styles.btn}>
                    <AnimatedIcon icon="format_paint" /> Re-style
                </button>
                <button className={styles.btn}>
                    <AnimatedIcon icon="summarize" /> Summary
                </button>
                <button className={styles.btnPrimary}>
                    <AnimatedIcon icon="add_task" /> Accept All
                </button>
            </div>
        </div>
    );
}
