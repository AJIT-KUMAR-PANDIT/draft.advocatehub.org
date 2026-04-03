import React from 'react';
import styles from './Dashboard.module.scss';
import AnimatedIcon from '@nakprc/components/UI/AnimatedIcon';
import Sidebar from './Sidebar/Sidebar';
import TopNavBar from './TopNavBar/TopNavBar';
import KPIGrid from './KPIGrid/KPIGrid';
import ActiveDockets from './ActiveDockets/ActiveDockets';

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 md:ml-64 relative">
                <TopNavBar />

                <div className="max-w-[1200px] mx-auto px-8 py-12 pb-32">
                    <KPIGrid />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Dashboard Column */}
                        <div className="lg:col-span-8 space-y-12">
                            <ActiveDockets />
                        </div>

                        {/* Right Column Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* AI Insights Panel */}
                            <div className={styles.aiInsightsPanel}>
                                <div className="relative z-10">
                                    <div className={styles.header}>
                                        <AnimatedIcon icon="auto_awesome" className={styles.icon} />
                                        <h3 className={styles.title}>AI Quality Scores</h3>
                                    </div>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className={styles.progress}>
                                            <svg viewBox="0 0 96 96">
                                                <circle cx="48" cy="48" r="40" stroke="currentColor"></circle>
                                                <circle cx="48" cy="48" r="40" stroke="currentColor"></circle>
                                            </svg>
                                            <span className={styles.text}>92%</span>
                                        </div>
                                        <div>
                                            <p className={styles.description}>Your consistency in "Indemnification Clauses" is in the top 5% of advocates this month.</p>
                                        </div>
                                    </div>
                                    <div className={styles.trending}>
                                        <span className={styles.title}>Trending Trend</span>
                                        <div className={styles.content}>
                                            <AnimatedIcon icon="trending_up" className="material-symbols-outlined text-emerald-400" />
                                            <span className="font-body text-sm">Efficiency increased by 14% this week.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-container rounded-full blur-3xl opacity-50"></div>
                            </div>

                            {/* Calendar / Quick Links */}
                            <div className={styles.calendarCard}>
                                <h3 className={styles.header}>Upcoming Deadlines</h3>
                                <div className="space-y-6">
                                    <div className={styles.deadline}>
                                        <div className={styles.icon}>
                                            <span className={styles.label}>Oct</span>
                                            <span className={styles.date}>12</span>
                                        </div>
                                        <div>
                                            <p className={styles.title}>Acme Corp Filling</p>
                                            <p className={styles.subtext}>Due at 4:30 PM</p>
                                        </div>
                                    </div>
                                    <div className={styles.deadline}>
                                        <div className={styles.icon}>
                                            <span className={styles.label}>Oct</span>
                                            <span className={styles.date}>14</span>
                                        </div>
                                        <div>
                                            <p className={styles.title}>Lease Notarization</p>
                                            <p className={styles.subtext}>Main Registry Office</p>
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.openButton}>Open Full Docket</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Floating Toolbar */}
                <div className={styles.floatingToolbar}>
                    <div className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface cursor-pointer">
                        <AnimatedIcon icon="search_check" className="material-symbols-outlined text-xl" />
                        <span className="font-label text-[10px] uppercase tracking-widest font-bold">Clause Search</span>
                    </div>
                    <div className="h-4 w-[1px] bg-outline-variant/30"></div>
                    <div className="flex items-center gap-2 text-secondary font-bold cursor-pointer">
                        <AnimatedIcon icon="auto_fix" className="material-symbols-outlined text-xl" />
                        <span className="font-label text-[10px] uppercase tracking-widest">Smart Draft</span>
                    </div>
                </div>

                {/* Bottom Nav */}
                <nav className={styles.bottomNavBar}>
                    <a href="#" className="flex flex-col items-center text-on-surface font-bold">
                        <AnimatedIcon icon="home" className="material-symbols-outlined" />
                        <span className="font-label text-[10px] font-medium">Home</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-slate-400">
                        <AnimatedIcon icon="description" className="material-symbols-outlined" />
                        <span className="font-label text-[10px] font-medium">Drafts</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-slate-400">
                        <AnimatedIcon icon="verified" className="material-symbols-outlined" />
                        <span className="font-label text-[10px] font-medium">AI Check</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-slate-400">
                        <AnimatedIcon icon="person" className="material-symbols-outlined" />
                        <span className="font-label text-[10px] font-medium">Profile</span>
                    </a>
                </nav>
            </main>
        </div>
    );
}
