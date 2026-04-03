import React from 'react';
import styles from './DraftFloatingBar.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function DraftFloatingBar() {
    return (
        <div className={styles.toolbar}>
            <button className={styles.actionBtn}>
                <AnimatedIcon icon="lightbulb" />
                <span className={styles.label}>Suggestions</span>
            </button>
            <div className={styles.divider} />
            <button className={styles.primaryBtn}>
                <AnimatedIcon icon="auto_fix_high" />
                <span className={styles.label}>Auto-Complete Step</span>
            </button>
            <div className={styles.divider} />
            <button className={styles.actionBtn}>
                <AnimatedIcon icon="help" />
                <span className={styles.label}>Guidance</span>
            </button>
        </div>
    );
}
