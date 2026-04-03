import React from 'react';
import styles from './AICheckHeader.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Image from 'next/image';

export default function AICheckHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <span className={styles.brand}>Draft.AdvocateHub</span>
                <div className={styles.divider} />
                <h1 className={styles.docTitle}>Final_Brief_Commercial_v4.docx</h1>
            </div>
            <div className={styles.rightSection}>
                <button className={styles.exportBtn}>
                    <AnimatedIcon icon="picture_as_pdf" /> Export PDF
                </button>
                <button className={styles.exportBtnPrimary}>
                    <AnimatedIcon icon="description" /> Export Word
                </button>
                <div className={styles.iconGroup}>
                    <span className={styles.iconBtn}><AnimatedIcon icon="notifications" /></span>
                    <span className={styles.iconBtn}><AnimatedIcon icon="settings" /></span>
                    <div className={styles.avatar}>
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIhLJJZgSGls4TmvWBtOFuq_MEJfK4JtFq5btSa_oSMM9Nhy2hmK3s6MITifGKneoJoTO329VPDac-zhf9K7dWOlI3PhgfRDk7TVxah1UuJJulwXbJZFxzLwULeXiYrO94lY45e3v2WeoM10zyYaHy7OWasvFctry5AePbOBa77tIbI8wa_RxrSEjp_SmKGA7Qk2ZwOFqEc0JqEr6qIV1NsLg3sWGvZCHqC2o2V6z24BuGzKeR67X5M_d9Xwbz0HmIW5Hori2vE2U"
                            alt="Advocate profile"
                            width={32}
                            height={32}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
