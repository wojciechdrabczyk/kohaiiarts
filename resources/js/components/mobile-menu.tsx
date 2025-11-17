import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import { Link, router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

type NavLink = { label: string; href?: string; name?: string };
type Props = { links: NavLink[]; theme?: 'light' | 'dark' };

function Portal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return createPortal(children, document.body);
}

export default function MobileMenu({ links }: Props) {
    const [open, setOpen] = useState(false);
    const openerRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', open);
        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [open]);

    const handleLinkClick = (link: NavLink) => (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(false);
        if (link.name) {
            if (route().current(link.name)) return;
            router.visit(route(link.name), { preserveScroll: true, preserveState: true });
        } else if (link.href) {
            const a = new URL(link.href, window.location.origin);
            const b = new URL(window.location.href);
            if (a.pathname === b.pathname && a.search === b.search) return;
            router.visit(link.href, { preserveScroll: true, preserveState: true });
        }
    };

    const itemVariants = {
        open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.2, 0.65, 0.3, 0.9] as const } },
        closed: { opacity: 0, y: 8, transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] as const } },
    } as const;

    return (
        <>
            <button
                ref={openerRef}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gray-200/90 backdrop-blur md:hidden dark:bg-neutral-800/90"
            >
                <span className="relative block h-4 w-6">
                    <span
                        className={`absolute top-0 left-0 h-0.5 w-full bg-black transition-transform duration-300 dark:bg-white ${open ? 'translate-y-2 rotate-45' : ''}`}
                    />
                    <span
                        className={`absolute top-1/2 left-0 -mt-[1px] h-0.5 w-full bg-black transition-opacity duration-200 dark:bg-white ${open ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <span
                        className={`absolute bottom-0 left-0 h-0.5 w-full bg-black transition-transform duration-300 dark:bg-white ${open ? '-translate-y-2 -rotate-45' : ''}`}
                    />
                </span>
            </button>

            <Portal>
                <AnimatePresence>
                    {open && (
                        <>
                            <motion.div
                                key="backdrop"
                                className="fixed inset-0 z-[1000] bg-black/40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                onClick={() => setOpen(false)}
                            />
                            <motion.div
                                key="sheet"
                                role="dialog"
                                aria-modal="true"
                                className="fixed inset-0 z-[1001] flex flex-col overflow-hidden bg-white outline-none md:hidden dark:bg-neutral-900"
                                initial={{ opacity: 0.001 }}
                                animate={{ opacity: 1, transition: { duration: 0.24, ease: [0.2, 0.65, 0.3, 0.9] } }}
                                exit={{ opacity: 0.001, transition: { duration: 0.22, ease: [0.4, 0.0, 0.2, 1] } }}
                                style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
                            >
                                <motion.div
                                    className="relative flex h-full flex-col"
                                    initial={{ opacity: 10 }}
                                    animate={{ opacity: 1, transition: { duration: 0.24, delay: 0.06 } }}
                                    exit={{ opacity: 0, y: 12, transition: { duration: 0.22 } }}
                                >
                                    <div className="absolute top-4 right-4">
                                        <button
                                            aria-label="Close menu"
                                            onClick={() => setOpen(false)}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
                                        >
                                            <span className="relative block h-4 w-4">
                                                <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rotate-45 bg-black dark:bg-white" />
                                                <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 -rotate-45 bg-black dark:bg-white" />
                                            </span>
                                        </button>
                                    </div>

                                    <motion.nav
                                        className="flex-1 overflow-y-auto"
                                        variants={itemVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        <div className="flex h-full flex-col items-center justify-center gap-10">
                                            {links.map((l) => {
                                                const key = l.name ?? l.href ?? l.label;
                                                const to = l.name ? route(l.name) : (l.href as string);
                                                return (
                                                    <motion.div key={key} variants={itemVariants}>
                                                        <Link
                                                            href={to}
                                                            prefetch
                                                            onClick={handleLinkClick(l)}
                                                            className="text-2xl font-semibold text-gray-800 transition-transform active:scale-[0.98] dark:text-gray-100"
                                                        >
                                                            {l.label}
                                                        </Link>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </motion.nav>

                                    <motion.div
                                        className="border-t border-gray-200 dark:border-white/10"
                                        variants={itemVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        <motion.div
                                            className="mx-auto flex items-center justify-center gap-4 py-4 text-[#822a59] dark:text-[#c59d36]"
                                            variants={itemVariants}
                                        >
                                            <a
                                                href="https://x.com/KohaiiArts"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="X / Twitter"
                                                className="p-2 transition-transform active:scale-95"
                                            >
                                                <FaXTwitter size={20} />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/kohaii_arts/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram"
                                                className="p-2 transition-transform active:scale-95"
                                            >
                                                <BsInstagram size={20} />
                                            </a>
                                            <a
                                                href="https://kohaiiarts.newgrounds.com/art"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Newgrounds"
                                                className="p-2 transition-transform active:scale-95"
                                            >
                                                <span>
                                                    <NewgroundsIcon size={20} />
                                                </span>
                                            </a>
                                            <a
                                                href="https://www.threads.net/@kohaii_arts"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Threads"
                                                className="p-2 transition-transform active:scale-95"
                                            >
                                                <SiThreads size={20} />
                                            </a>
                                            <a
                                                href="https://discord.gg/hqGs4fGQXm"
                                                aria-label="Discord"
                                                className="p-2 transition-transform active:scale-95"
                                            >
                                                <FaDiscord size={20} />
                                            </a>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </Portal>
        </>
    );
}
