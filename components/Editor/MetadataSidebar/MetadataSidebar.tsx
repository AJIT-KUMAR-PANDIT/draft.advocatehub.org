import React from 'react';
import styles from './MetadataSidebar.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function MetadataSidebar() {
    return (
        <aside className={styles.sidebar}>
            {/* Doc Details Card */}
            <div className={styles.card}>
                <h3 className={styles.cardHeader}>Document Meta</h3>
                <div className={styles.metaList}>
                    <div className={styles.metaGroup}>
                        <p className={styles.metaLabel}>Document Type</p>
                        <p className={styles.metaValue}>Mutual NDA</p>
                    </div>
                    <div className={styles.metaGroup}>
                        <p className={styles.metaLabel}>Primary Parties</p>
                        <p className={styles.metaValue}>ABC Corp vs XYZ Ventures</p>
                    </div>
                    <div className={styles.metaGroup}>
                        <p className={styles.metaLabel}>Drafted By</p>
                        <p className={styles.metaValue}>Julian S. Thorne</p>
                    </div>
                </div>
            </div>

            {/* AI Clause Suggester */}
            <div className={styles.cardFlex}>
                <h3 className={styles.cardHeader}>
                    AI Suggested Clauses
                    <AnimatedIcon icon="auto_awesome" className={styles.icon} />
                </h3>
                <div className={styles.aiList}>
                    <div className={styles.aiSuggestion}>
                        <p className={styles.title}>Non-Solicitation Addendum</p>
                        <p className={styles.desc}>Standard 12-month clause for Delaware entities.</p>
                    </div>
                    <div className={styles.aiSuggestion}>
                        <p className={styles.title}>Force Majeure Clause</p>
                        <p className={styles.desc}>Updated for digital infrastructure failures.</p>
                    </div>
                    <div className={styles.aiSuggestion}>
                        <p className={styles.title}>Equitable Relief</p>
                        <p className={styles.desc}>Standard injunctive relief language.</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
