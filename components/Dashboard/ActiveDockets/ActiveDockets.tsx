import React from 'react';
import styles from './ActiveDockets.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function ActiveDockets() {
    return (
        <div className="space-y-12">
            {/* Ongoing Drafts */}
            <section className={styles.section}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Ongoing Drafts</h2>
                    <button className={styles.viewAll}>View All</button>
                </div>
                <div className={styles.grid}>
                    {/* Card 1 */}
                    <div className={styles.draftCard}>
                        <div className={styles.topHeader}>
                            <span className={styles.badge}>Section 01.0</span>
                            <AnimatedIcon icon="arrow_forward" className={styles.icon} />
                        </div>
                        <h3 className={styles.title}>Vendor Agreement</h3>
                        <p className={styles.subtitle}>Parties: Acme Corp &amp; Zenith Logistics</p>
                        <div className={styles.progressSection}>
                            <div className={styles.labels}>
                                <span>Progress: S4</span>
                                <span>65%</span>
                            </div>
                            <div className={styles.track}>
                                <div className={styles.fill} style={{ width: '65%' }}></div>
                            </div>
                            <div className={styles.steps}>
                                <span className={`${styles.step} ${styles.active}`}></span>
                                <span className={`${styles.step} ${styles.active}`}></span>
                                <span className={`${styles.step} ${styles.active}`}></span>
                                <span className={`${styles.step} ${styles.active}`}></span>
                                <span className={styles.step}></span>
                                <span className={styles.step}></span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className={styles.draftCard}>
                        <div className={styles.topHeader}>
                            <span className={styles.badge}>Section 02.4</span>
                            <AnimatedIcon icon="arrow_forward" className={styles.icon} />
                        </div>
                        <h3 className={styles.title}>Lease Renewal</h3>
                        <p className={styles.subtitle}>Parties: Heritage Estates &amp; Singh Family</p>
                        <div className={styles.progressSection}>
                            <div className={styles.labels}>
                                <span>Progress: S2</span>
                                <span>30%</span>
                            </div>
                            <div className={styles.track}>
                                <div className={styles.fill} style={{ width: '30%' }}></div>
                            </div>
                            <div className={styles.steps}>
                                <span className={`${styles.step} ${styles.active}`}></span>
                                <span className={`${styles.step} ${styles.active}`}></span>
                                <span className={styles.step}></span>
                                <span className={styles.step}></span>
                                <span className={styles.step}></span>
                                <span className={styles.step}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pending Client Requests */}
            <section className={styles.section}>
                <h2 className={`${styles.title} mb-6`}>Pending Client Requests</h2>
                <div className={styles.tableSection}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th>Client</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Urgency</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            <tr>
                                <td className={styles.name}>Priya Mehta</td>
                                <td className={styles.type}>NDA</td>
                                <td>
                                    <span className={styles.statusWrapper}>
                                        <span className={`${styles.dot} ${styles.submitted}`}></span>
                                        Submitted
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.urgencyBadge} ${styles.priority}`}>Priority</span>
                                </td>
                                <td className={styles.actions}>
                                    <button className={styles.btn}>
                                        <AnimatedIcon icon="more_vert" className="material-symbols-outlined" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.name}>Rohan Verma</td>
                                <td className={styles.type}>MOU</td>
                                <td>
                                    <span className={styles.statusWrapper}>
                                        <span className={`${styles.dot} ${styles.review}`}></span>
                                        In Review
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.urgencyBadge} ${styles.standard}`}>Standard</span>
                                </td>
                                <td className={styles.actions}>
                                    <button className={styles.btn}>
                                        <AnimatedIcon icon="more_vert" className="material-symbols-outlined" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
