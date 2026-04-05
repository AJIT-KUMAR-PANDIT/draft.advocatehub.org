import React from 'react';
import styles from './TopNavBar.module.scss';
import Link from 'next/link';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Image from 'next/image';

interface TopNavBarProps {
    isMobileMenuOpen?: boolean;
    onMenuToggle?: () => void;
}

export default function TopNavBar({ isMobileMenuOpen = false, onMenuToggle = () => { } }: TopNavBarProps) {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button
                    className={styles.mobileMenuBtn}
                    onClick={onMenuToggle}
                    aria-label="Toggle menu"
                >
                    <AnimatedIcon icon="menu" className={styles.hamburgerIcon} />
                </button>
                <Image src="/logo.webp" alt="Draft AdvocateHub Logo" width={220} height={40} className="h-10 w-auto object-contain md:hidden" priority />
                <div className={styles.searchBox}>
                    <AnimatedIcon icon="search" className={styles.icon} />
                    <input className={styles.input} placeholder="Search case files..." type="text" />
                </div>
            </div>

            <div className={styles.rightSection}>
                <nav className={styles.nav}>
                    <Link href="#" className={styles.link}>Documents</Link>
                    <Link href="#" className={styles.link}>Templates</Link>
                    <Link href="#" className={styles.link}>Clients</Link>
                </nav>
                <div className={styles.actions}>
                    <button className={styles.iconBtn}>
                        <AnimatedIcon icon="notifications" className={styles.icon} />
                        <span className={styles.badge}></span>
                    </button>
                    <button className={styles.iconBtn}>
                        <AnimatedIcon icon="settings" className={styles.icon} />
                    </button>
                    <div className={styles.avatar}>
                        <img
                            alt="Advocate profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTNd3BQskU6Hv6SswbwxNpMxRy1FYLQBGu0IY2H3cwmAB6ETIO8Iz1mdC9wULg4YIMRSGXBEJlJfG3VcSsfDPnP3rQ3CMVEqP2ddTu_mUhYrix4ggL4h184fiXYlGWDM_b5XZX8geN1YgNJoXc5aNmH6nAkEVtx-E0Kt2V87ouzkVyNOEdHmHGEdpQMKxCE9nnPjKIKHTXSusHjwEFnh3KeLWFdZeXlFtgH5RqGtI-jE3srDsdtjkUPkWI21QCWnyxezmy2IXbB5s"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
