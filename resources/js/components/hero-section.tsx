import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import MobileMenu from '@/components/mobile-menu';
import NavItem from '@/components/nav-item';
import { Link } from '@inertiajs/react';
import { motion, MotionConfig, stagger } from 'framer-motion';
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
] as const;

const navLinks = [
    { label: 'Illustrations', name: 'home' as const },
    { label: 'Store', name: 'store' as const },
    { label: 'Support', name: 'support' as const },
    { label: 'Commissions', name: 'commissions' as const },
    { label: 'FAQ', name: 'faq' as const },
    { label: 'Contact', name: 'contact' as const },
];

const EASE = [0.2, 0.65, 0.3, 0.9] as const;
const PARENT_DURATION = 0.28;
const CHILD_DURATION = 0.22;
const STAGGER = 0.06;
const START_DELAY = 0.06;

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
        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
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
            <section className="relative w-full bg-white py-16 text-center antialiased md:py-20 dark:bg-black">
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

                <div className="absolute hidden items-center sm:left-5 md:left-5 md:flex">
                    <MotionConfig reducedMotion="never">
                        <motion.ul
                            key="social-rail"
                            className="flex flex-col items-center gap-10 will-change-transform"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden:  { opacity: 0, x: -16, scale: 0.98 },
                                visible: {
                                    opacity: 1, x: 0, scale: 1,
                                    transition: {
                                        duration: PARENT_DURATION,
                                        ease: EASE,
                                        ...stagger(STAGGER, { startDelay: START_DELAY }),
                                    },
                                },
                            }}
                        >
                            {socials.map(({ url, name, Icon, title }) => (
                                <motion.li
                                    key={url}
                                    className="will-change-transform"
                                    variants={{
                                        hidden:  { opacity: 0, y: 10, scale: 0.9 },
                                        visible: {
                                            opacity: 1, y: 0, scale: 1,
                                            transition: { duration: CHILD_DURATION, ease: EASE },
                                        },
                                    }}
                                >
                                    <motion.a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={name}
                                        title={title}
                                        className="inline-flex h-6 w-6 items-center justify-center rounded text-[#822a59] dark:text-[#822a59] transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                                        whileHover={{ scale: 1.12, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                                    >
                                        <Icon size={24} />
                                    </motion.a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </MotionConfig>
                </div>


                <div className="relative mx-auto h-[200px] w-[206px]">
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

                <h1 className="mt-6 text-3xl font-light text-[#6e1f48] md:text-6xl dark:text-[#6e1f48]" style={{ fontFamily: 'Montserrat' }}>
                    KOHAII ARTS
                </h1>
                <p className="mt-2 text-base text-gray-500 md:text-xl dark:text-gray-400" style={{ fontFamily: 'Montserrat' }}>
                    Digital Illustrator / Hobbyist
                </p>

                <nav aria-label="Primary" className="mt-6 hidden flex-wrap justify-center gap-4 md:flex">
                    {navLinks.map(({ label, name }) => (
                        <NavItem key={name} name={name} label={label} className={buttonStyle} />
                    ))}
                </nav>
            </section>
        </div>
    );
}
