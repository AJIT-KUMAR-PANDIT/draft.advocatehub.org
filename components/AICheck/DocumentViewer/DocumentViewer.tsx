import React from 'react';
import styles from './DocumentViewer.module.scss';

export default function DocumentViewer() {
    return (
        <div className={styles.area}>
            <div className={styles.inner}>
                <div className={styles.paper}>
                    <div className={styles.docHeader}>
                        <span className={styles.sectionLabel}>SECTION 01.0 // PRELIMINARY STATEMENT</span>
                        <h2 className={styles.docTitle}>Legal Memorandum Regarding Liability in Commercial Arbitration</h2>
                    </div>

                    <div className={styles.body}>
                        <p>
                            Pursuant to Article 4.2 of the International Commercial Arbitration Act, the claimant asserts that the respondent
                            failed to maintain fiduciary duties during the acquisition phase.{' '}
                            <span className={styles.plagHighlight}>
                                This failure constitutes a material breach of the underlying contract and justifies an immediate suspension of obligations
                            </span>{' '}
                            as defined in the master service agreement of 2021.
                        </p>

                        <p>
                            Furthermore, it is{' '}
                            <span className={styles.grammarOld}>necessary that the court must</span>{' '}
                            <span className={styles.grammarNew}>imperative for the court to</span>{' '}
                            recognize the distinct separation between the holding entity and the local subsidiary. The{' '}
                            <span className={styles.plagHighlight}>jurisdictional arguments presented by the defense</span>{' '}
                            lack the requisite legal standing to challenge the tribunal&apos;s authority in this matter.
                        </p>

                        <div className={styles.aiNote}>
                            <span className={styles.noteLabel}>AI Quality Observation</span>
                            <p className={styles.noteText}>
                                The tone in this paragraph shifts from formal to advisory. Suggest aligning with the
                                high-stakes editorial standard of the document.
                            </p>
                        </div>

                        <p>
                            The evidence suggests that the{' '}
                            <span className={styles.grammarOld}>bad decisions were made</span>{' '}
                            <span className={styles.grammarNew}>erroneous judgments were executed</span>{' '}
                            by the board of directors during the fiscal year closing.{' '}
                            <span className={styles.plagHighlight}>Standard valuation techniques were ignored</span>{' '}
                            in favor of aggressive internal projections that did not reflect actual market conditions.
                        </p>

                        <p>
                            In conclusion, the{' '}
                            <span className={styles.grammarOld}>things that happened</span>{' '}
                            <span className={styles.grammarNew}>sequence of events</span>{' '}
                            lead to an undeniable conclusion: the respondent&apos;s actions were deliberate and calculated
                            to obscure the true financial position from stakeholders.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
