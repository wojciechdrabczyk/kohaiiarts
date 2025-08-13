import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaMoon, FaSun, FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';
import MobileMenu from '@/components/mobile-menu';

export default function HeroSection() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);

    useEffect(() => {
        const current = localStorage.getItem('theme');
        if (current === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    if (!mounted) return null;

    return (
        <div>
            <section className="relative w-full bg-white py-16 text-center antialiased dark:bg-black">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={toggleTheme}
                        className="hidden md:block relative h-10 w-10 rounded-full bg-gray-200 transition hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        aria-label="Toggle theme"
                    >
                        <span
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                                theme === 'dark' ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
                            }`}
                        >
                            <FaMoon className="h-5 w-5 text-gray-800" />
                        </span>
                        <span
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                                theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'
                            }`}
                        >
                            <FaSun className="h-5 w-5 text-yellow-400" />
                        </span>
                    </button>
                </div>

                <MobileMenu
                    links={[
                        { label: 'Illustrations', href: route('home') },
                        { label: 'Store', href: route('store') },
                        { label: 'Support', href: route('support') },
                        { label: 'Commissions', href: route('commissions') },
                        { label: 'FAQ', href: route('faq') },
                        { label: 'Contact', href: route('contact') },
                    ]}
                    brandColor="#822a59"
                    onToggleTheme={toggleTheme}
                    theme={theme}
                />

                <div className={['absolute hidden items-center md:flex', 'sm:left-5 md:left-5', ''].join(' ')}>
                    <div className="flex flex-col items-center gap-10">
                        <a
                            href="https://x.com/KohaiiArts"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X / Twitter"
                            className="transition-transform duration-200 hover:scale-110"
                        >
                            <FaXTwitter size={20} className="text-[#822a59] dark:text-[#822a59]" />
                        </a>
                        <a
                            href="https://www.instagram.com/kohaii_arts/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="transition-transform duration-200 hover:scale-110"
                        >
                            <BsInstagram size={20} className="text-[#822a59] dark:text-[#822a59]" />
                        </a>
                        <a
                            href="https://kohaiiarts.newgrounds.com/art"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Newgrounds"
                            className="transition-transform duration-200 hover:scale-110"
                        >
                            <span className="text-[#822a59] dark:text-[#822a59]">
                                <NewgroundsIcon size={20} />
                            </span>
                        </a>
                        <a
                            href="https://www.threads.net/@kohaii_arts"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Threads"
                            className="transition-transform duration-200 hover:scale-110"
                        >
                            <SiThreads size={20} className="text-[#822a59] dark:text-[#822a59]" />
                        </a>
                        <a href="https://discord.gg/hqGs4fGQXm" aria-label="Discord" className="transition-transform duration-200 hover:scale-110">
                            <FaDiscord size={20} className="text-[#822a59] dark:text-[#822a59]" />
                        </a>
                    </div>
                </div>



                <div className="relative mx-auto h-[200px] w-[206px]">
                    <Link href="/">
                        <img
                            src="/img-static/LogoKohii.webp"
                            alt="Kohaii Arts Logo Light"
                            loading="eager"
                            onLoad={() => setLogoLoaded(true)}
                            className={`absolute inset-0 h-full w-full object-contain transition-all duration-[500ms] ease-in-out ${theme === 'dark' ? 'opacity-0' : 'opacity-100'} ${logoLoaded ? 'blur-0' : 'blur-lg'} `}
                        />
                        <img
                            src="/img-static/LogoKohiiNight.webp"
                            alt="Kohaii Arts Logo Dark"
                            loading="eager"
                            onLoad={() => setLogoLoaded(true)}
                            className={`absolute inset-0 h-full w-full object-contain transition-all duration-[500ms] ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} ${logoLoaded ? 'blur-0' : 'blur-lg'} `}
                        />
                    </Link>
                </div>

                <h1 className="mt-6 text-3xl font-light text-gray-800 md:text-6xl dark:text-white" style={{ fontFamily: 'Caveat Brush' }}>
                    Kohaii Arts
                </h1>
                <p className="mt-2 text-base text-gray-600 md:text-xl dark:text-gray-400" style={{ fontFamily: 'Caveat Brush' }}>
                    Illustrating the soul of stories
                </p>

                <div className="hidden md:flex mt-6 flex-wrap justify-center gap-4">
                    <Link
                        href={route('home')}
                        className="rounded-lg bg-[#6e1f48] px-5 py-2.5 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#822a59]"
                        prefetch
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Illustrations
                    </Link>
                    <Link
                        href={route('store')}
                        className="rounded-lg bg-[#6e1f48] px-5 py-2.5 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#822a59]"
                        prefetch
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Store
                    </Link>
                    <Link
                        href={route('support')}
                        className="rounded-lg bg-[#6e1f48] px-5 py-2.5 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#822a59]"
                        prefetch
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Support
                    </Link>
                    <Link
                        href={route('commissions')}
                        className="rounded-lg bg-[#6e1f48] px-5 py-2.5 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#822a59]"
                        prefetch
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Commissions
                    </Link>
                    <Link
                        href={route('faq')}
                        className="rounded-lg bg-[#6e1f48] px-5 py-2.5 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#822a59]"
                        prefetch
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        FAQ
                    </Link>
                    <Link
                        href={route('contact')}
                        className="rounded-lg bg-[#6e1f48] px-5 py-2.5 font-medium text-white transition-colors duration-200 ease-in-out hover:bg-[#822a59]"
                        prefetch
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Contact
                    </Link>
                </div>
            </section>
        </div>
    );
}
