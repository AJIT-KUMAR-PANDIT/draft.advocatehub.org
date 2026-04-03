import React from 'react';
import styles from './VoiceInput.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';

export default function VoiceInput() {
    // Array of base heights for the waveform bars
    const barHeights = ['h-4', 'h-6', 'h-3', 'h-8', 'h-12', 'h-5', 'h-10', 'h-7', 'h-9', 'h-11', 'h-4', 'h-8'];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.status}>
                    <span className={styles.indicator}></span>
                    Voice Engine Active
                </span>
                <span className={styles.timer}>04:12 Speaking</span>
            </div>
            
            <div className={styles.transcript}>
                <p>
                    This Nondisclosure Agreement is made and entered into as of October 24, 2023, by and between ABC Corp. 
                    <span className={styles.boldHighlight}> (<span className={`${styles.italic} ${styles.underline}`}>"Disclosing Party"</span>)</span> and XYZ Ventures 
                    <span className={`${styles.boldHighlight} ${styles.underline}`}> (<span className={styles.italic}>"Receiving Party"</span>)</span>. 
                    <span className={styles.boldHighlight}> WHEREAS</span>, the parties wish to explore a potential business relationship 
                    in connection with which the Disclosing Party may disclose its Confidential Information...
                </p>
                <p className={styles.activeLine}>
                    <span className={styles.boldHighlight}>WHEREAS</span>, the Receiving Party acknowledges the proprietary nature of the trade secrets 
                    <span className={styles.cursor}></span>
                </p>
            </div>

            <div className={styles.controlsArea}>
                <div className={styles.waveform}>
                    {barHeights.map((h, i) => (
                        <div key={i} className={`${styles.bar} ${h}`}></div>
                    ))}
                </div>
                
                <div className="flex justify-center">
                    <button className={styles.pauseBtn}>
                        <AnimatedIcon icon="pause" className="text-4xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}
