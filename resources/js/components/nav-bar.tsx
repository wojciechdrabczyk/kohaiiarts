import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaSun, FaMoon, FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    const ThemeIcon = theme === 'dark' ? FaSun : FaMoon;

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const popoverPanelStyles =
        'absolute top-full mt-2 rounded-xl w-44 rounded-md border border-gray-200 bg-white dark:bg-gray-800 shadow-lg z-10';
    const popoverLinkStyles =
        'flex items-center gap-2 rounded-xl w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';

    return (
        <div className="">
            <nav className={'bg-white shadow-md dark:bg-black'}>
                <div className={'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
                    <div className={'flex h-16 items-center justify-between'}>
                        <div className={'flex items-center'}>
                            <Link href={route('home')} className={'text-xl font-black text-gray-800 dark:text-white'}>
                                Kohaii Arts
                            </Link>
                        </div>
                        <div className={'hidden items-center space-x-8 md:flex'}>
                            <Link href={route('home')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                Illustrations
                            </Link>
                            <a href="https://www.inprnt.com/gallery/kohaiiarts/" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                Shop
                            </a>
                            <Popover className="relative">
                                <PopoverButton className="text-gray-500 hover:text-gray-700 dark:text-gray-300">Support</PopoverButton>
                                <PopoverPanel className={popoverPanelStyles}>
                                    <a href="https://www.patreon.com/KohaiiArts" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><FaPatreon size={14} /></span> Patreon
                                    </a>
                                    <a href="https://throne.com/kohaiiarts" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><ThroneIcon className="h-4 w-4" /></span> Throne
                                    </a>
                                </PopoverPanel>
                            </Popover>
                            <Link href={route('services')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                Services
                            </Link>
                            <Popover className="relative">
                                <PopoverButton className="text-gray-500 hover:text-gray-700 dark:text-gray-300">Socials</PopoverButton>
                                <PopoverPanel className={popoverPanelStyles}>
                                    <a href="https://x.com/KohaiiArts" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><FaXTwitter size={14} /></span> Twitter / X
                                    </a>
                                    <a href="https://www.instagram.com/kohaii_arts/" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><BsInstagram size={14} /></span> Instagram
                                    </a>
                                    <a href="https://kohaiiarts.newgrounds.com/art" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><NewgroundsIcon className="w-4 h-4" /></span> Newgrounds
                                    </a>
                                    <a href="https://www.threads.net/@kohaii_arts" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><SiThreads size={14} /></span> Threads
                                    </a>
                                    <a href="#" className={popoverLinkStyles}>
                                        <span className="w-4 flex justify-center"><FaDiscord size={14} /></span> Discord
                                    </a>
                                </PopoverPanel>
                            </Popover>

                            <Link href={route('faq')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                FAQ
                            </Link>
                            <Link href={route('contact')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                Contact
                            </Link>
                            <div
                                className="hidden cursor-pointer items-center space-x-2 rounded-full border border-gray-300 px-3 py-1 transition hover:bg-gray-100 md:flex dark:border-gray-600 dark:hover:bg-gray-800"
                                onClick={toggleTheme}
                            >
                                <ThemeIcon className="text-gray-700 dark:text-gray-300" />
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
            </nav>
        </div>
    );
}
