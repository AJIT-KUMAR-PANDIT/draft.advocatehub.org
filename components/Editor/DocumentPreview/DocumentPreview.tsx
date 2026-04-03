import React from 'react';
import styles from './DocumentPreview.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function DocumentPreview() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Live Document Preview</span>
                <div className={styles.actions}>
                    <AnimatedIcon icon="zoom_in" className={styles.icon} />
                    <AnimatedIcon icon="print" className={styles.icon} />
                </div>
            </div>
            
            <div className={styles.documentArea}>
                <div className={styles.paper}>
                    <h2 className={styles.docTitle}>Nondisclosure Agreement</h2>
                    
                    <p className={styles.paragraph}>
                        <span className={styles.sectionLabel}>SECTION 01.0. THE PARTIES.</span> This Mutual Nondisclosure Agreement (this “Agreement”) is entered into as of the Effective Date, by and between ABC Corp, a Delaware Corporation, and XYZ Ventures, a limited liability partnership.
                    </p>
                    
                    <p className={styles.paragraph}>
                        <span className={styles.sectionLabel}>SECTION 02.0. PURPOSE.</span> The Disclosing Party and Receiving Party wish to explore a business opportunity of mutual interest (the “Transaction”) in connection with which the Disclosing Party has disclosed or may disclose to the Receiving Party certain confidential, technical and business information.
                    </p>
                    
                    <p className={styles.paragraph}>
                        <span className={styles.sectionLabel}>SECTION 03.0. CONFIDENTIAL INFORMATION.</span> “Confidential Information” means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or by inspection of tangible objects, including, without limitation, documents, business plans, source code, software, and financial analysis.
                    </p>
                    
                    <p className={styles.draftingText}>
                        (Drafting in progress...)
                    </p>
                </div>
            </div>
        </div>
    );
}
