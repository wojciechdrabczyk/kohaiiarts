import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import MobileMenu from '@/components/mobile-menu';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaMoon, FaSun, FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

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

    const style =
        'rounded px-5 py-2.5 border-2 border-[#822a59] font-medium \
         text-[#6e1f48] transition-colors duration-200 ease-in-out \
         hover:bg-[#822a59] hover:text-white active:bg-[#561335] active:text-white \
         dark:text-[#822a59] dark:hover:bg-[#6e1f48] dark:hover:text-white dark:active:bg-[#3a0e25]';

    if (!mounted) return null;

    return (
        <div>
            <section className="relative w-full bg-white py-16 text-center antialiased dark:bg-black">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={toggleTheme}
                        className="relative hidden h-10 w-10 rounded-full bg-gray-200 transition hover:bg-gray-300 md:block dark:bg-neutral-800 dark:hover:bg-neutral-700"
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

                <h1 className="mt-6 text-3xl font-light text-[#6e1f48] md:text-6xl dark:text-[#6e1f48]" style={{ fontFamily: 'Montserrat' }}>
                    KOHAII ARTS
                </h1>
                <p className="mt-2 text-base text-gray-500 md:text-xl dark:text-gray-700" style={{ fontFamily: 'Montserrat' }}>
                    Digital Illustrator / Hobbyist
                </p>

                <div className="mt-6 hidden flex-wrap justify-center gap-4 md:flex">
                    <Link href={route('home')} className={style} prefetch style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Illustrations
                    </Link>
                    <Link href={route('store')} className={style} prefetch style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Store
                    </Link>
                    <Link href={route('support')} className={style} prefetch style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Support
                    </Link>
                    <Link href={route('commissions')} className={style} prefetch style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Commissions
                    </Link>
                    <Link href={route('faq')} className={style} prefetch style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        FAQ
                    </Link>
                    <Link href={route('contact')} className={style} prefetch style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Contact
                    </Link>
                </div>
            </section>
        </div>
    );
}
