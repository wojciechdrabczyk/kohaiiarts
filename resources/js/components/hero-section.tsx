import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import VGenIcon from '@/assets/icons/VgenIcon';
import MobileMenu from '@/components/mobile-menu';
import NavItem from '@/components/nav-item';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaMoon, FaSun, FaThreads, FaXTwitter } from 'react-icons/fa6';

type Theme = 'light' | 'dark';

const socials = [
    { name: 'X', url: 'https://x.com/KohaiiArts', Icon: FaXTwitter, title: 'X' },
    { name: 'Threads', url: 'https://www.threads.com/@kohaii_arts', Icon: FaThreads, title: 'Threads' },
    { name: 'Instagram', url: 'https://www.instagram.com/kohaii_arts/', Icon: BsInstagram, title: 'Instagram' },
    { name: 'Discord', url: 'https://discord.gg/hqGs4fGQXm', Icon: FaDiscord, title: 'Discord' },
    { name: 'Newgrounds', url: 'https://kohaiiarts.newgrounds.com/art', Icon: NewgroundsIcon, title: 'Newgrounds' },
    { name: 'VGen', url: 'https://vgen.co/KohaiiArts', Icon: VGenIcon, title: 'VGen' },
] as const;

const mid = Math.ceil(socials.length / 2);
const socialsLeft = socials.slice(0, mid);
const socialsRight = socials.slice(mid);

const navLinks = [
    { label: 'Illustrations', name: 'home' as const },
    { label: 'Store', name: 'store' as const },
    { label: 'Support', name: 'support' as const },
    { label: 'Commissions', name: 'commissions' as const },
    { label: 'FAQ', name: 'faq' as const },
    { label: 'Contact', name: 'contact' as const },
];

export default function HeroSection() {
    const [theme, setTheme] = useState<Theme>('light');
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
        const root = document.documentElement;

        root.classList.add('theme-transition');

        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
        root.classList.toggle('dark', next === 'dark');

        window.setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 220);
    };

    const buttonStyle = useMemo(
        () =>
            [
                'rounded px-5 py-2.5 border-2 font-medium transition-colors duration-200 ease-in-out',
                'border-[#822a59] text-[#6e1f48]',
                'hover:bg-[#822a59] hover:text-white',
                'active:bg-[#561335] active:text-white',
                'dark:text-[#822a59] dark:hover:bg-[#6e1f48] dark:hover:text-white dark:active:bg-[#3a0e25]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black',
            ].join(' '),
        [],
    );

    if (!mounted) return null;

    return (
        <div>
            <section className="bg-background relative w-full py-1 text-center antialiased sm:px-1 md:px-1 lg:px-1">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={toggleTheme}
                        className="relative hidden h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:outline-none md:flex dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        aria-label="Toggle theme"
                    >
                        <span
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:duration-0 ${
                                theme === 'dark' ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
                            }`}
                            aria-hidden={theme === 'dark'}
                        >
                            <FaMoon className="h-5 w-5 text-gray-800" />
                        </span>
                        <span
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:duration-0 ${
                                theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'
                            }`}
                            aria-hidden={theme !== 'dark'}
                        >
                            <FaSun className="h-5 w-5 text-yellow-400" />
                        </span>
                    </button>
                </div>

                <MobileMenu
                    links={navLinks.map(({ label, name }) => ({ label, href: route(name) }))}
                    brandColor="#822a59"
                    onToggleTheme={toggleTheme}
                    theme={theme}
                />

                <div className="relative mx-auto h-[120px] w-[126px] sm:h-[150px] sm:w-[156px] md:h-[170px] md:w-[176px]">
                    <Link href={route('home')} aria-label="Kohaii Arts – Home" className="relative block h-full w-full">
                        <img
                            src="/img-static/LogoKohii.webp"
                            alt="Kohaii Arts Logo"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            onLoad={() => setLogoLoaded(true)}
                            className={[
                                'absolute inset-0 h-full w-full object-contain',
                                'transition-all duration-[500ms] ease-in-out motion-reduce:duration-0',
                                theme === 'dark' ? 'opacity-0' : 'opacity-100',
                                logoLoaded ? 'blur-0' : 'opacity-80 blur-lg',
                            ].join(' ')}
                            aria-hidden={theme === 'dark'}
                            onClick={route().current('home') ? (e) => e.preventDefault() : undefined}
                        />

                        <img
                            src="/img-static/LogoKohiiNight.webp"
                            alt="Kohaii Arts Logo (dark)"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            onLoad={() => setLogoLoaded(true)}
                            className={[
                                'absolute inset-0 h-full w-full object-contain',
                                'transition-all duration-[500ms] ease-in-out motion-reduce:duration-0',
                                theme === 'dark' ? 'opacity-100' : 'opacity-0',
                                logoLoaded ? 'blur-0' : 'opacity-80 blur-lg',
                            ].join(' ')}
                            aria-hidden={theme !== 'dark'}
                            onClick={route().current('home') ? (e) => e.preventDefault() : undefined}
                        />
                    </Link>
                </div>

                <div className="mt-4 flex flex-col items-center gap-4 md:gap-6">
                    <h1
                        className="text-3xl font-light text-[#6e1f48] transition-colors duration-300 md:text-6xl dark:text-[#deb34a] dark:drop-shadow-[0_0_0.35rem_rgba(222,179,74,0.35)]"
                        style={{ fontFamily: 'Montserrat' }}
                    >
                        KOHAII ARTS
                    </h1>

                    <div className="flex items-center justify-center gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] md:gap-8">
                        <ul className="hidden justify-end gap-5 sm:flex md:gap-6">
                            {socialsLeft.map(({ url, name, Icon, title }) => (
                                <li key={url}>
                                    <motion.a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={name}
                                        title={title}
                                        className="inline-flex h-6 w-6 items-center justify-center text-[#822a59] transition-colors duration-300 ease-in-out hover:text-[#6e1f48] dark:text-[#c59d36] dark:hover:text-[#f1d27a] dark:hover:drop-shadow-[0_0_0.35rem_rgba(197,157,54,0.45)]"
                                        whileHover={{ scale: 1.12, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                                    >
                                        <Icon size={24} />
                                    </motion.a>
                                </li>
                            ))}
                        </ul>

                        <p
                            className="text-base text-gray-500 sm:col-start-2 sm:justify-self-center md:text-xl dark:text-gray-400"
                            style={{ fontFamily: 'Montserrat' }}
                        >
                            Digital Illustrator / Hobbyist
                        </p>

                        <ul className="hidden justify-start gap-5 sm:flex md:gap-6">
                            {socialsRight.map(({ url, name, Icon, title }) => (
                                <li key={url}>
                                    <motion.a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={name}
                                        title={title}
                                        className="inline-flex h-6 w-6 items-center justify-center text-[#822a59] transition-colors duration-300 ease-in-out hover:text-[#6e1f48] dark:text-[#c59d36] dark:hover:text-[#f1d27a] dark:hover:drop-shadow-[0_0_0.35rem_rgba(197,157,54,0.45)]"
                                        whileHover={{ scale: 1.12, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                                    >
                                        <Icon size={24} />
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav aria-label="Primary" className="hidden flex-wrap justify-center gap-4 md:flex">
                        {navLinks.map(({ label, name }) => (
                            <NavItem key={name} name={name} label={label} className={buttonStyle} />
                        ))}
                    </nav>
                </div>
            </section>
        </div>
    );
}
