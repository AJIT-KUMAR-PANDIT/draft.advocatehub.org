import React from 'react';
import styles from './EditorHeader.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Image from 'next/image';

export default function EditorHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <div className={styles.title}>NDA - ABC Corp</div>
                <div className={styles.divider}></div>
                <div className={styles.badges}>
                    <span className={styles.version}>Version 2.4</span>
                    <span className={styles.status}>Drafting</span>
                </div>
            </div>
            <div className={styles.rightSection}>
                <button className={styles.saveBtn}>
                    <AnimatedIcon icon="save" className={styles.icon} /> Save
                </button>
                <button className={styles.aiBtn}>
                    <AnimatedIcon icon="verified" className={styles.icon} /> Run AI Checks
                </button>
                <div className={styles.avatar}>
                    <Image 
                        className="" 
                        alt="Professional advocate" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAnnQU1i0FHqyxPavnDwkE79hvJWy6VCE0hpZlxxu0RitpIrgaxyDVVuuBp9aDksm4aj35UAww_QvSlCLQuXNDhoBzQp94gjIte-g4zNpVJBrud3dqZ6lSo4t_F2APP5Iy1wfFfvPbj0czugQ1_yIElrghFPdt7sLRXQYBd_c1tqDHivQbMPxX2DS2X2xP7Gs4dfkw_lfskfLFdMm0iuHVzSaBoOCJD4pPvlQIrpsI8XnVLU7PxhfyTQooNERFXxbwyvYWerrKuOg" 
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </header>
    );
}
