import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import { Dialog, Transition } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import { Fragment, useEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

type NavLink = { label: string; href: string };
type Props = {
    links: NavLink[];
    brandColor?: string;
};

export default function MobileMenu({ links, brandColor = '#822a59' }: Props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', open);
        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [open]);

    const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(false);
        setTimeout(() => router.visit(href), 300);
    };

    return (
        <>
            <button
                aria-label={open ? 'Close menu' : 'Open menu'}
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

            <Dialog open={open} onClose={setOpen} className="md:hidden">
                <Transition
                    show={open}
                    appear
                    as={Fragment}
                    enter="transition-opacity duration-250 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-250 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition>

                <Transition
                    show={open}
                    appear
                    as={Fragment}
                    enter="transform transition duration-300 ease-out"
                    enterFrom="opacity-0 translate-y-4 scale-[0.98]"
                    enterTo="opacity-100 translate-y-0 scale-100"
                    leave="transform transition duration-300 ease-in"
                    leaveFrom="opacity-100 translate-y-0 scale-100"
                    leaveTo="opacity-0 translate-y-4 scale-[0.98]"
                >
                    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white will-change-transform dark:bg-neutral-900">
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

                        <nav className="flex-1 overflow-y-auto">
                            <div className="flex h-full flex-col items-center justify-center gap-10">
                                {links.map((l, idx) => (
                                    <Transition
                                        key={l.label}
                                        show={open}
                                        appear
                                        as={Fragment}
                                        enter="transition transform duration-300 ease-out"
                                        enterFrom="opacity-0 translate-y-2"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition transform duration-200 ease-in"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-2"
                                    >
                                        <Link
                                            href={l.href}
                                            prefetch
                                            onClick={handleLinkClick(l.href)}
                                            className="text-2xl font-semibold text-gray-800 transition-transform active:scale-[0.98] dark:text-gray-100"
                                            style={{ transitionDelay: open ? `${idx * 60}ms` : '0ms' }} // delay only when opening
                                        >
                                            {l.label}
                                        </Link>
                                    </Transition>
                                ))}
                            </div>
                        </nav>

                        <div className="border-top border-gray-200 dark:border-white/10">
                            <Transition
                                show={open}
                                appear
                                as={Fragment}
                                enter="transition-opacity duration-300 ease-out"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-250 ease-in"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="mx-auto flex items-center justify-center gap-4 py-4" style={{ color: brandColor }}>
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
                                    <a href="#" aria-label="Discord" className="p-2 transition-transform active:scale-95">
                                        <FaDiscord size={20} />
                                    </a>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </Transition>
            </Dialog>
        </>
    );
}
