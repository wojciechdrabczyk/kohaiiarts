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

    const popoverPanelStyles = 'absolute top-full mt-2 rounded-xl w-44 rounded-md border border-gray-200 bg-white dark:bg-neutral-900 shadow-lg';
    const popoverLinkStyles =
        'flex items-center gap-2 rounded-xl w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';

    return (
        <div className="sticky top-0 z-1">
            <nav className="bg-white shadow-md dark:bg-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className={'mx-auto max-w-7xl px-4 sm:px-1 lg:px-1'}>
                    <div className={'flex h-16 items-center justify-between'}>
                        <Link href={route('home')} className="flex items-center gap-2 overflow-hidden">
                            <img
                                src="https://kohaiiarts.carrd.co/assets/images/image01.png?v=a15c23c2"
                                alt="Kohaii Arts Logo"
                                className="hidden h-14 w-auto flex-shrink-0 sm:block"
                            />
                            <div className="flex flex-col overflow-hidden leading-tight">
                                <span className="truncate text-2xl font-light text-gray-800 lg:block dark:text-white">Kohaii Arts</span>
                                <span className="hidden truncate text-xs font-light tracking-wide text-gray-500 lg:block dark:text-gray-400">
                                    Illustrating the soul of stories
                                </span>
                            </div>
                        </Link>

                        <div className={'hidden items-center space-x-5 text-lg sm:flex'}>
                            <Link
                                href={route('home')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/' ? 'text-black underline dark:text-white' : ''}`}
                            >
                                Illustrations
                            </Link>

                            <Link href={route('store')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                <span className="inline-flex items-center gap-2">Store</span>
                            </Link>

                            <Link
                                href={route('support')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/support' ? 'text-black underline dark:text-white' : ''}`}
                            >
                                Support
                            </Link>
                            <Link
                                href={route('commissions')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/commissions' ? 'text-black underline dark:text-white' : ''}`}
                            >
                                Commissions
                            </Link>
                            <Popover className="relative">
                                <PopoverButton className="text-gray-500 hover:text-gray-700 focus:ring-0 focus:outline-none dark:text-gray-300">
                                    Socials
                                </PopoverButton>
                                <PopoverPanel className={popoverPanelStyles}>
                                    <a href="https://x.com/KohaiiArts" className={popoverLinkStyles}>
                                        <span className="flex w-4 justify-center">
                                            <FaXTwitter size={size} />
                                        </span>{' '}
                                        Twitter / X
                                    </a>
                                    <a href="https://www.instagram.com/kohaii_arts/" className={popoverLinkStyles}>
                                        <span className="flex w-4 justify-center">
                                            <BsInstagram size={size} />
                                        </span>{' '}
                                        Instagram
                                    </a>
                                    <a href="https://kohaiiarts.newgrounds.com/art" className={popoverLinkStyles}>
                                        <span className="flex w-4 justify-center">
                                            <NewgroundsIcon size={size} />
                                        </span>{' '}
                                        Newgrounds
                                    </a>
                                    <a href="https://www.threads.net/@kohaii_arts" className={popoverLinkStyles}>
                                        <span className="flex w-4 justify-center">
                                            <SiThreads size={size} />
                                        </span>{' '}
                                        Threads
                                    </a>
                                    <a href="#" className={popoverLinkStyles}>
                                        <span className="flex w-4 justify-center">
                                            <FaDiscord size={size} />
                                        </span>{' '}
                                        Discord
                                    </a>
                                </PopoverPanel>
                            </Popover>

                            <Link
                                href={route('faq')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/faq' ? 'text-black underline dark:text-white' : ''}`}
                            >
                                FAQ
                            </Link>
                            <Link
                                href={route('contact')}
                                className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 ${url === '/contact' ? 'text-black underline dark:text-white' : ''}`}
                            >
                                Contact
                            </Link>
                            <div
                                className="hidden w-33 cursor-pointer items-center space-x-2 rounded-full border border-gray-300 px-3 py-1 transition hover:bg-gray-100 md:flex dark:border-gray-600 dark:hover:bg-neutral-800"
                                onClick={toggleTheme}
                            >
                                <ThemeIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </div>
                        </div>
                        <div className="flex items-center md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none dark:text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="flex flex-col space-y-2 px-4 pb-4 md:hidden">
                        <Link href={route('home')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            <span className="inline-flex items-center gap-2">Illustrations</span>
                        </Link>

                        <Link href={route('store')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            <span className="inline-flex items-center gap-2">Store</span>
                        </Link>
                        <div>
                            <p className={'font-semibold text-gray-700 dark:text-gray-300'}>Support</p>
                            <div className={'ml-4 flex flex-col space-y-1'}>
                                <a href="https://www.patreon.com/KohaiiArts" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <FaPatreon size={size} />
                                    </span>{' '}
                                    Patreon
                                </a>
                                <a href="https://throne.com/kohaiiarts" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <ThroneIcon size={size} />
                                    </span>{' '}
                                    Throne
                                </a>
                            </div>
                        </div>
                        <Link href={route('commissions')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            <span className="inline-flex items-center gap-2">Commissions</span>
                        </Link>
                        <div>
                            <p className={'font-semibold text-gray-700 dark:text-gray-300'}>Socials</p>
                            <div className={'ml-4 flex flex-col space-y-1'}>
                                <a href="https://x.com/KohaiiArts" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <FaXTwitter size={size} />
                                    </span>{' '}
                                    Twitter / X
                                </a>
                                <a href="https://www.instagram.com/kohaii_arts/" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <BsInstagram size={size} />
                                    </span>{' '}
                                    Instagram
                                </a>
                                <a href="https://kohaiiarts.newgrounds.com/art" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <NewgroundsIcon size={size} />
                                    </span>{' '}
                                    Newgrounds
                                </a>
                                <a href="https://www.threads.net/@kohaii_arts" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <SiThreads size={size} />
                                    </span>{' '}
                                    Threads
                                </a>
                                <a href="#" className={popoverLinkStyles}>
                                    <span className="flex w-4 justify-center">
                                        <FaDiscord size={size} />
                                    </span>{' '}
                                    Discord
                                </a>
                            </div>
                        </div>
                        <Link href={route('faq')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            <span className="inline-flex items-center gap-2">FAQ</span>
                        </Link>
                        <Link href={route('contact')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            <span className="inline-flex items-center gap-2">Contact</span>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

NavBar.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
