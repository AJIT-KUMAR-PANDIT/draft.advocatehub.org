import React from 'react';
import styles from './QualitySidebar.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function QualitySidebar() {
    // SVG circle math: r=58, circumference=2*PI*58≈364.4
    const circumference = 364.4;
    const score = 72;
    const offset = circumference - (score / 100) * circumference;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.stack}>
                {/* Quality Score Gauge */}
                <section>
                    <h3 className={styles.sectionTitle}>Overall AI Quality Score</h3>
                    <div className={styles.gaugeCard}>
                        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="58" fill="transparent" className="text-surface-container-highest" stroke="currentColor" strokeWidth="8" />
                            <circle
                                cx="64" cy="64" r="58" fill="transparent"
                                className="text-secondary"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className={styles.gaugeNumber}>
                            <span className={styles.score}>{score}</span>
                            <span className={styles.label}>Composite</span>
                        </div>
                        <div className={styles.gaugeBadge}>
                            <span>Needs Refinement</span>
                        </div>
                    </div>
                </section>

                {/* Similarity Report */}
                <section>
                    <div className={styles.similarityHeader}>
                        <h3 className={styles.sectionTitle}>Similarity Report</h3>
                        <span className={styles.risk}>High Risk</span>
                    </div>
                    <div className={styles.sourceList}>
                        <div className={styles.source}>
                            <div className={styles.sourceRow}>
                                <span className={styles.sourceName}>Source #1: Legal Daily</span>
                                <span className={styles.pctHigh}>12%</span>
                            </div>
                            <div className={styles.bar}>
                                <div className={`${styles.fill} ${styles.fillError}`} style={{ width: '12%' }} />
                            </div>
                        </div>
                        <div className={styles.source}>
                            <div className={styles.sourceRow}>
                                <span className={styles.sourceName}>Source #2: Westlaw Archive</span>
                                <span className={styles.pctMed}>4%</span>
                            </div>
                            <div className={styles.bar}>
                                <div className={`${styles.fill} ${styles.fillSecondary}`} style={{ width: '4%' }} />
                            </div>
                        </div>
                        <button className={styles.viewAll}>View Full Report</button>
                    </div>
                </section>

                {/* Compliance Checklist */}
                <section>
                    <h3 className={styles.sectionTitle}>Compliance Checklist</h3>
                    <div className={styles.checklist}>
                        <div className={styles.item}>
                            <span className="text-green-600"><AnimatedIcon icon="check_circle" /></span>
                            <div>
                                <p className={styles.itemTitle}>Bluebook Citation Styles</p>
                                <p className={styles.itemDesc}>Standardized correctly across 14 instances.</p>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <span className="text-secondary"><AnimatedIcon icon="error" /></span>
                            <div>
                                <p className={styles.itemTitle}>Margin Requirements (2&quot;)</p>
                                <p className={styles.itemDesc}>Section 03.1 exceeds boundary.</p>
                            </div>
                        </div>
                        <div className={styles.itemDisabled}>
                            <span className="text-outline-variant"><AnimatedIcon icon="radio_button_unchecked" /></span>
                            <div>
                                <p className={styles.itemTitle}>Signature Block Formatting</p>
                                <p className={styles.itemDesc}>Awaiting completion of document.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Suite */}
                <div className={styles.actions}>
                    <button className={styles.btnPrimary}>
                        <AnimatedIcon icon="done_all" /> Accept All Suggestions
                    </button>
                    <button className={styles.btnOutline}>
                        Resolve Issues Manually
                    </button>
                </div>
            </div>
        </aside>
    );
}
