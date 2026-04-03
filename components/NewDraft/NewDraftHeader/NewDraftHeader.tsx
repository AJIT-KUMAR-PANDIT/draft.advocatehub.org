import React from 'react';
import styles from './NewDraftHeader.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Image from 'next/image';

export default function NewDraftHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <span className={styles.brand}>Draft.AdvocateHub</span>
                <nav className={styles.nav}>
                    <span className={styles.navItemActive}>Documents</span>
                    <span className={styles.navItem}>Templates</span>
                    <span className={styles.navItem}>Clients</span>
                </nav>
            </div>

            <div className={styles.stepIndicator}>
                <span className={styles.stepLabel}>Step 1 of 3</span>
                <span className={styles.stepTitle}>Document Details</span>
            </div>

            <div className={styles.rightSection}>
                <span className={styles.iconBtn}><AnimatedIcon icon="notifications" /></span>
                <span className={styles.iconBtn}><AnimatedIcon icon="settings" /></span>
                <div className={styles.avatar}>
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkNRadAuAfSgTGW9nUECTi9k4slZkDne3vjY9fYUalxlZ-ytWeAEoFGfhOGGHN1mR0tjMP7gIlsYZkPO1_J6A9HvVrazL0U-sfApJcNP6PDINtwpsn_ZNeQJzdcQIbTsCbJEvZeoocrRvLKiZq2DiHCD-a8q8xPaVZdlBltUr-2nYFX5_8eztahId-GtV-wG1kBZpuceiOg_Hp3OJ31IjyaaP0omaUgjKOYTzXNlvh75J9kYo46MX5nTqUuKJLy9HPU14mDmGSHko"
                        alt="Advocate profile"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </header>
    );
}
