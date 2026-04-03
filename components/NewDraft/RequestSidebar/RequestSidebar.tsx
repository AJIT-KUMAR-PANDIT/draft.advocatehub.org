import React from 'react';
import styles from './RequestSidebar.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function RequestSidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sticky}>
                <h3 className={styles.title}>Request Summary</h3>

                <div className={styles.stack}>
                    {/* Core Intent */}
                    <div className={styles.summaryCard}>
                        <span className={styles.cardTag}>01. Core Intent</span>
                        <div className={styles.cardRows}>
                            <div className={styles.cardRow}>
                                <span className={styles.rowLabel}>Type</span>
                                <span className={styles.rowValue}>NDA</span>
                            </div>
                            <div className={styles.cardRow}>
                                <span className={styles.rowLabel}>Priority</span>
                                <span className={styles.rowValueAccent}>High</span>
                            </div>
                        </div>
                    </div>

                    {/* Parties pending */}
                    <div className={styles.pendingCard}>
                        <span className={styles.pendingTag}>02. Parties</span>
                        <p className={styles.pendingText}>Awaiting step completion...</p>
                    </div>

                    {/* Instructions pending */}
                    <div className={styles.pendingCard}>
                        <span className={styles.pendingTag}>03. Special Instructions</span>
                        <p className={styles.pendingText}>Awaiting input...</p>
                    </div>
                </div>

                {/* AI Verification card */}
                <div className={styles.aiCard}>
                    <div className={styles.aiContent}>
                        <div className={styles.aiIcon}>
                            <AnimatedIcon icon="auto_awesome" />
                        </div>
                        <h4 className={styles.aiTitle}>AI Verification</h4>
                        <p className={styles.aiDesc}>
                            Our engine is analyzing your selections to suggest relevant boilerplate clauses for review.
                        </p>
                    </div>
                    <div className={styles.aiBall} />
                </div>
            </div>
        </aside>
    );
}
