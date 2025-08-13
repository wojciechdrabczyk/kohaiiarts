import HeroSection from '@/components/hero-section';
import DefaultLayout from '@/layouts/default-layout';
import { Head,} from '@inertiajs/react';
import { useLayoutEffect, useState } from 'react';

export default function NavBar() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useLayoutEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);


    return (
        <div className="top-0 z-10">
            <Head>
                <link rel="preload" href="/img-static/LogoKohii.webp" as="image" />
                <link rel="preload" href="/img-static/LogoKohiiNight.webp" as="image" />
            </Head>
            <HeroSection />
        </div>
    );
}

NavBar.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
