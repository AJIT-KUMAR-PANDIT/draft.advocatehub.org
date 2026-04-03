/* components/Dashboard.tsx */
import React from 'react';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
    return (
        <main className="relative bg-surface">
            {/* Main container */}
            <div className="container mx-auto px-4 py-8">
                {/* Grid: 1 column on mobile, 5 columns on lg+ */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* ===== Left column – Active Dockets ===== */}
                    <div className="lg:col-span-1 space-y-8">
                        <section className="bg-surface-container-low p-6 rounded-lg">
                            <h2 className="font-headline text-xl font-bold mb-4">Active Dockets</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left divide-y divide-outline-variant/10">
                                    <thead>
                                        <tr className="bg-surface-container-lowest">
                                            {['Name', 'Type', 'Status', 'Urgency'].map((col) => (
                                                <th
                                                    key={col}
                                                    className="px-6 py-4 font-label uppercase text-[10px] tracking-widest text-on-surface-variant"
                                                >
                                                    {col}
                                                </th>
                                            ))}
                                            <th className="px-6 py-4 font-label uppercase text-[10px] tracking-widest text-on-surface-variant" />
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-outline-variant/10">
                                        {/* Row 1 */}
                                        <tr className="hover:bg-surface-container-low transition-colors">
                                            <td className="px-6 py-4 font-bold text-on-surface">Priya Mehta</td>
                                            <td className="px-6 py-4 text-on-surface-variant text-sm">NDA</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-2 text-sm">
                                                    <span className="w-2 h-2 rounded-full bg-secondary-container" />
                                                    Submitted
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-label font-bold uppercase rounded-sm">
                                                    Priority
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-primary hover:text-secondary">
                                                    <span
                                                        className="material-symbols-outlined"
                                                        data-icon="more_vert"
                                                    >
                                                        more_vert
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr className="hover:bg-surface-container-low transition-colors">
                                            <td className="px-6 py-4 font-bold text-on-surface">Rohan Verma</td>
                                            <td className="px-6 py-4 text-on-surface-variant text-sm">MOU</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-2 text-sm">
                                                    <span className="w-2 h-2 rounded-full bg-primary-container" />
                                                    In Review
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-label font-bold uppercase rounded-sm">
                                                    Standard
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-primary hover:text-secondary">
                                                    <span
                                                        className="material-symbols-outlined"
                                                        data-icon="more_vert"
                                                    >
                                                        more_vert
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* ===== Right column – AI panel & calendar ===== */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* AI Insights Panel */}
                        <div className={styles.aiInsightsPanel}>
                            <div className={styles.header}>
                                <span
                                    className="material-symbols-outlined text-secondary-fixed"
                                    data-icon="auto_awesome"
                                >
                                    auto_awesome
                                </span>
                                <h3 className={styles.title}>AI Quality Scores</h3>
                            </div>

                            {/* Progress */}
                            <div className={styles.progress}>
                                <svg viewBox="0 0 96 96" className={styles.progressSvg}>
                                    <circle
                                        className={styles.circle1}
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        strokeWidth="4"
                                    />
                                    <circle
                                        className={styles.circle2}
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        strokeWidth="4"
                                    />
                                </svg>
                                <span className={styles.text}>92%</span>
                            </div>

                            {/* Description */}
                            <p className={styles.description}>
                                Your consistency in “Indemnification Clauses” is in the top 5% of
                                advocates this month.
                            </p>

                            {/* Trending */}
                            <div className={styles.trending}>
                                <span className={styles.title}>Trending Trend</span>
                                <div className={styles.content}>
                                    <span
                                        className="material-symbols-outlined text-emerald-400"
                                        data-icon="trending_up"
                                    >
                                        trending_up
                                    </span>
                                    <span className="font-body text-sm">
                                        Efficiency increased by 14% this week.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Background accent – purely decorative */}
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-container rounded-full blur-3xl opacity-50" />

                        {/* Calendar / Quick Links */}
                        <div className={styles.calendarCard}>
                            <h3 className={styles.header}>Upcoming Deadlines</h3>

                            {/* Deadline 1 */}
                            <div className="flex gap-4">
                                <div className={styles.deadline.icon}>
                                    <span
                                        className="font-label text-[10px] uppercase text-on-surface-variant"
                                    >
                                        Oct
                                    </span>
                                    <span className="font-headline font-bold text-lg">12</span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-on-surface">
                                        Acme Corp Filling
                                    </p>
                                    <p className="text-xs text-on-surface-variant">
                                        Due at 4:30 PM
                                    </p>
                                </div>
                            </div>

                            {/* Deadline 2 */}
                            <div className="flex gap-4">
                                <div className={styles.deadline.icon}>
                                    <span
                                        className="font-label text-[10px] uppercase text-on-surface-variant"
                                    >
                                        Oct
                                    </span>
                                    <span className="font-headline font-bold text-lg">14</span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-on-surface">
                                        Lease Notarization
                                    </p>
                                    <p className="text-xs text-on-surface-variant">
                                        Main Registry Office
                                    </p>
                                </div>
                            </div>

                            <button className={styles.openButton}>Open Full Docket</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Floating Toolbar (desktop only) */}
            <div className={styles.floatingToolbar}>
                <div className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface cursor-pointer">
                    <span
                        className="material-symbols-outlined text-xl"
                        data-icon="search_check"
                    >
                        search_check
                    </span>
                    <span className="font-label text-[10px] uppercase tracking-widest font-bold">
                        Clause Search
                    </span>
                </div>

                <div className="h-4 w-[1px] bg-outline-variant/30" />

                <div className="flex items-center gap-2 text-secondary font-bold cursor-pointer">
                    <span
                        className="material-symbols-outlined text-xl"
                        data-icon="auto_fix"
                    >
                        auto_fix
                    </span>
                    <span className="font-label text-[10px] uppercase tracking-widest">
                        Smart Draft
                    </span>
                </div>
            </div>

            {/* Bottom Nav – mobile only */}
            <nav className={styles.bottomNavBar}>
                <a
                    href="#"
                    className="flex flex-col items-center text-on-surface font-bold"
                >
                    <span
                        className="material-symbols-outlined"
                        data-icon="home"
                    >
                        home
                    </span>
                    <span className="font-label text-[10px] font-medium">Home</span>
                </a>

                <a
                    href="#"
                    className="flex flex-col items-center text-slate-400"
                >
                    <span
                        className="material-symbols-outlined"
                        data-icon="description"
                    >
                        description
                    </span>
                    <span className="font-label text-[10px] font-medium">Drafts</span>
                </a>

                <a
                    href="#"
                    className="flex flex-col items-center text-slate-400"
                >
                    <span
                        className="material-symbols-outlined"
                        data-icon="verified"
                    >
                        verified
                    </span>
                    <span className="font-label text-[10px] font-medium">AI Check</span>
                </a>

                <a
                    href="#"
                    className="flex flex-col items-center text-slate-400"
                >
                    <span
                        className="material-symbols-outlined"
                        data-icon="person"
                    >
                        person
                    </span>
                    <span className="font-label text-[10px] font-medium">Profile</span>
                </a>
            </nav>
        </main>
    );
}
