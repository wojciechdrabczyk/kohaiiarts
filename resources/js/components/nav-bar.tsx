import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import DefaultLayout from '@/layouts/default-layout';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { useLayoutEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaMoon, FaPatreon, FaSun, FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

export default function NavBar() {
    const size = 14;
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    const ThemeIcon = theme === 'dark' ? FaSun : FaMoon;

    useLayoutEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const popoverPanelStyles = 'absolute top-full mt-2 rounded-xl w-44 border border-gray-200 bg-white dark:bg-neutral-900 shadow-lg';
    const popoverLinkStyles =
        'flex items-center gap-2 rounded-xl w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';

    return (
        <div className="sticky top-0 z-10">
            <nav className="bg-white shadow-md dark:bg-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex h-16 items-center justify-between">
                        <Link href={route('home')} className="flex flex-shrink-0 items-center gap-3 overflow-hidden" prefetch>
                            <img
                                src="/img-static/kohaii-arts-logo.png"
                                alt="Kohaii Arts Logo"
                                className="h-14 w-auto flex-shrink-0"
                            />
                            <div className="flex min-w-0 flex-col overflow-hidden leading-tight">
                                <span className="truncate text-2xl font-light text-gray-800 dark:text-white">Kohaii Arts</span>
                                <span className="truncate text-xs font-light tracking-wide text-gray-500 dark:text-gray-400">
                                    Illustrating the soul of stories
                                </span>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center space-x-5 text-lg">
                            <Link
                                href={route('home')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/' ? 'text-black underline dark:text-white' : ''}`}
                                prefetch
                            >
                                Illustrations
                            </Link>
                            <Link href={route('store')} className="text-gray-500 hover:text-gray-700 dark:text-gray-300" prefetch>
                                Store
                            </Link>
                            <Link
                                href={route('support')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/support' ? 'text-black underline dark:text-white' : ''}`}
                                prefetch
                            >
                                Support
                            </Link>
                            <Link
                                href={route('commissions')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/commissions' ? 'text-black underline dark:text-white' : ''}`}
                                prefetch
                            >
                                Commissions
                            </Link>
                            <Popover className="relative">
                                <PopoverButton className="text-gray-500 hover:text-gray-700 focus:ring-0 focus:outline-none dark:text-gray-300">
                                    Socials
                                </PopoverButton>
                                <PopoverPanel className={popoverPanelStyles}>
                                    <a href="https://x.com/KohaiiArts" className={popoverLinkStyles} target="_blank" rel="noopener noreferrer">
                                        <span className="flex w-4 justify-center"><FaXTwitter size={size} /></span> Twitter / X
                                    </a>
                                    <a href="https://www.instagram.com/kohaii_arts/" className={popoverLinkStyles} target="_blank" rel="noopener noreferrer">
                                        <span className="flex w-4 justify-center"><BsInstagram size={size} /></span> Instagram
                                    </a>
                                    <a href="https://kohaiiarts.newgrounds.com/art" className={popoverLinkStyles} target="_blank" rel="noopener noreferrer">
                                        <span className="flex w-4 justify-center"><NewgroundsIcon size={size} /></span> Newgrounds
                                    </a>
                                    <a href="https://www.threads.net/@kohaii_arts" className={popoverLinkStyles} target="_blank" rel="noopener noreferrer">
                                        <span className="flex w-4 justify-center"><SiThreads size={size} /></span> Threads
                                    </a>
                                    <a href="#" className={popoverLinkStyles} target="_blank">
                                        <span className="flex w-4 justify-center"><FaDiscord size={size} /></span> Discord
                                    </a>
                                </PopoverPanel>
                            </Popover>
                            <Link
                                href={route('faq')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/faq' ? 'text-black underline dark:text-white' : ''}`}
                                prefetch
                            >
                                FAQ
                            </Link>
                            <Link
                                href={route('contact')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/contact' ? 'text-black underline dark:text-white' : ''}`}
                                prefetch
                            >
                                Contact
                            </Link>
                            <div
                                className="hidden cursor-pointer items-center space-x-2 rounded-full border border-gray-300 px-3 py-1 transition hover:bg-gray-100 md:flex dark:border-gray-600 dark:hover:bg-neutral-800"
                                onClick={toggleTheme}
                            >
                                <ThemeIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </div>
                        </div>

                        {/* Mobile hamburger */}
                        <div className="flex items-center md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none dark:text-white" aria-expanded={isOpen}>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu — always mounted with transition */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
                        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="flex flex-col space-y-2 px-4 pb-4 bg-white dark:bg-black border-t dark:border-neutral-800 shadow-md">
                        <Link href={route('home')} className="text-gray-500 hover:text-gray-700 dark:text-gray-300" prefetch>
                            Illustrations
                        </Link>
                        <Link href={route('store')} className="text-gray-500 hover:text-gray-700 dark:text-gray-300" prefetch>
                            Store
                        </Link>
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">Support</p>
                            <div className="ml-4 flex flex-col space-y-1">
                                <a href="https://www.patreon.com/KohaiiArts" className={popoverLinkStyles}><FaPatreon size={size} /> Patreon</a>
                                <a href="https://throne.com/kohaiiarts" className={popoverLinkStyles}><ThroneIcon size={size} /> Throne</a>
                            </div>
                        </div>
                        <Link href={route('commissions')} className="text-gray-500 hover:text-gray-700 dark:text-gray-300" prefetch>
                            Commissions
                        </Link>
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">Socials</p>
                            <div className="ml-4 flex flex-col space-y-1">
                                <a href="https://x.com/KohaiiArts" className={popoverLinkStyles}><FaXTwitter size={size} /> Twitter / X</a>
                                <a href="https://www.instagram.com/kohaii_arts/" className={popoverLinkStyles}><BsInstagram size={size} /> Instagram</a>
                                <a href="https://kohaiiarts.newgrounds.com/art" className={popoverLinkStyles}><NewgroundsIcon size={size} /> Newgrounds</a>
                                <a href="https://www.threads.net/@kohaii_arts" className={popoverLinkStyles}><SiThreads size={size} /> Threads</a>
                                <a href="#" className={popoverLinkStyles}><FaDiscord size={size} /> Discord</a>
                            </div>
                        </div>
                        <Link href={route('faq')} className="text-gray-500 hover:text-gray-700 dark:text-gray-300" prefetch>
                            FAQ
                        </Link>
                        <Link href={route('contact')} className="text-gray-500 hover:text-gray-700 dark:text-gray-300" prefetch>
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

NavBar.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
