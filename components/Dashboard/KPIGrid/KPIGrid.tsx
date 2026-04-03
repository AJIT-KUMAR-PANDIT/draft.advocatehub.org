import React from 'react';
import styles from './KPIGrid.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function KPIGrid() {
    return (
        <section className="mb-12">
            <div className={styles.hero}>
                <div>
                    <h1 className={styles.title}>Good Morning, Sunita</h1>
                    <p className={styles.subtitle}>
                        Your drafting desk is ready. You have 3 urgent requests and 1 pending review for today's docket.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button className={styles.btnSecondary}>Generate Report</button>
                    <button className={styles.btnPrimary}>Start New Draft</button>
                </div>
            </div>

            <div className={styles.grid}>
                {/* Regular Card */}
                <div className={styles.card}>
                    <span className={styles.title}>Registered Advocates</span>
                    <div className={styles.content}>
                        <span className={styles.value}>1,204</span>
                        <div className={`${styles.stats} ${styles.positive}`}>
                            <AnimatedIcon icon="trending_up" className={styles.icon} />
                            <span className={styles.label}>+12%</span>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <span className={styles.title}>Client Registrations</span>
                    <div className={styles.content}>
                        <span className={styles.value}>842</span>
                        <div className={`${styles.stats} ${styles.neutral}`}>
                            <AnimatedIcon icon="horizontal_rule" className={styles.icon} />
                            <span className={styles.label}>Stable</span>
                        </div>
                    </div>
                </div>

                {/* Primary Accent Card */}
                <div className={`${styles.card} ${styles.primary}`}>
                    <span className={styles.title}>Drafts Completed</span>
                    <div className={styles.content}>
                        <span className={styles.value}>148</span>
                        <div className={`${styles.stats} ${styles.accent}`}>
                            <AnimatedIcon icon="verified" className={styles.icon} />
                            <span className={styles.label}>99% Quality</span>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <span className={styles.title}>Avg. Draft Time</span>
                    <div className={styles.content}>
                        <span className={styles.value}>42<small className="text-base font-normal ml-1">m</small></span>
                        <div className={`${styles.stats} ${styles.positive}`}>
                            <AnimatedIcon icon="trending_down" className={styles.icon} />
                            <span className={styles.label}>-5m YoY</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
