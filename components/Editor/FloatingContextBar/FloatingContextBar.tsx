import React from 'react';
import styles from './FloatingContextBar.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function FloatingContextBar() {
    return (
        <div className={styles.toolbar}>
            <button className={styles.actionBtn}>
                <AnimatedIcon icon="keyboard_voice" className={styles.icon} />
                Re-dictate Section
            </button>
            <div className={styles.divider}></div>
            <button className={styles.actionBtn}>
                <AnimatedIcon icon="edit" className={styles.icon} />
                Manual Override
            </button>
            <div className={styles.divider}></div>
            <button className={styles.actionBtnPrimary}>
                <AnimatedIcon icon="auto_fix_high" className={styles.icon} />
                Smart Polish
            </button>
        </div>
    );
}
