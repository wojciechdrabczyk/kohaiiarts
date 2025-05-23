import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

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
                                <PopoverPanel anchor="bottom" className="ml-4 flex flex-col space-y-1 p-2">
                                    <a href="https://www.patreon.com/KohaiiArts">Patreon</a>
                                    <a href="https://throne.com/kohaiiarts">Throne.gg</a>
                                </PopoverPanel>
                            </Popover>
                            <Link href={route('services')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                Services
                            </Link>
                            <Popover className="relative">
                                <PopoverButton className="text-gray-500 hover:text-gray-700 dark:text-gray-300">Socials</PopoverButton>
                                <PopoverPanel anchor="bottom" className="ml-4 flex flex-col space-y-1 p-2">
                                    <a href="https://x.com/KohaiiArts">Twitter / X</a>
                                    <a href="https://www.instagram.com/kohaii_arts/">Instagram</a>
                                    <a href="https://kohaiiarts.newgrounds.com/art">Newgrounds</a>
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
                {isOpen && (
                    <div className="flex flex-col space-y-2 px-4 pb-4 md:hidden">
                        <Link href={route('home')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            Illustrations
                        </Link>
                        <a href="https://www.inprnt.com/gallery/kohaiiarts/" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            Shop
                        </a>
                        <div>
                            <p className={'font-semibold text-gray-700 dark:text-gray-300'}>Support</p>
                            <div className={'ml-4 flex flex-col space-y-1'}>
                                <a href="https://www.patreon.com/KohaiiArts" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                    Patreon
                                </a>
                                <a href="https://throne.com/kohaiiarts" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                    Throne.gg
                                </a>
                            </div>
                        </div>
                        <Link href={route('services')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            Services
                        </Link>
                        <div>
                            <p className={'font-semibold text-gray-700 dark:text-gray-300'}>Socials</p>
                            <div className={'ml-4 flex flex-col space-y-1'}>
                                <a href="https://x.com/KohaiiArts" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                    Twitter / X
                                </a>
                                <a href="https://www.instagram.com/kohaii_arts/" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                    Instagram
                                </a>
                                <a href="https://kohaiiarts.newgrounds.com/art" className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                                    Newgrounds
                                </a>
                            </div>
                        </div>
                        <Link href={route('faq')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            FAQ
                        </Link>
                        <Link href={route('contact')} className={'text-gray-500 hover:text-gray-700 dark:text-gray-300'}>
                            Contact
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
}
