'use client';
import React, { useState } from 'react';
import styles from './DraftForm.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

const URGENCY_OPTIONS = ['Standard', 'Priority', 'Urgent'] as const;
type Urgency = typeof URGENCY_OPTIONS[number];

export default function DraftForm() {
    const [activeUrgency, setActiveUrgency] = useState<Urgency>('Priority');

    return (
        <div className={styles.formSection}>
            <div className={styles.intro}>
                <span className={styles.sectionTag}>Section 01.0</span>
                <h1 className={styles.title}>Initialize Legal Draft</h1>
                <p className={styles.subtitle}>
                    Provide the foundational parameters for your document. Our system will calibrate the
                    drafting engine based on these initial requirements.
                </p>
            </div>

            <div className={styles.formStack}>
                {/* Step 1: Document Type & Urgency */}
                <div className={styles.formGrid}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Primary Document Type</label>
                        <div className={styles.selectWrapper}>
                            <select className={styles.select}>
                                <option>Select from 20+ types...</option>
                                <option>Non-Disclosure Agreement (NDA)</option>
                                <option>Service Level Agreement (SLA)</option>
                                <option>Employment Contract</option>
                                <option>Commercial Lease</option>
                                <option>Power of Attorney</option>
                                <option>Intellectual Property Assignment</option>
                            </select>
                            <span className={styles.arrow}>
                                <AnimatedIcon icon="expand_more" />
                            </span>
                        </div>
                    </div>

                    <div className={styles.urgencyGroup}>
                        <label className={styles.fieldLabel}>Urgency Level</label>
                        <div className={styles.urgencyBtns}>
                            {URGENCY_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    className={activeUrgency === opt ? styles.btnActive : styles.btn}
                                    onClick={() => setActiveUrgency(opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Step 2 Preview Placeholder */}
                <div className={styles.stepPreview}>
                    <span className={styles.previewTag}>Section 02.0</span>
                    <h3 className={styles.previewTitle}>Party Identification</h3>
                    <div className={styles.previewGrid}>
                        <div className={styles.previewSkeleton} />
                        <div className={styles.previewSkeleton} />
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className={styles.navRow}>
                    <button className={styles.backBtn}>
                        <AnimatedIcon icon="arrow_back" /> Back
                    </button>
                    <button className={styles.continueBtn}>
                        <span className={styles.btnText}>Continue to Parties</span>
                        <span className={styles.btnIcon}>
                            <AnimatedIcon icon="arrow_forward" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
