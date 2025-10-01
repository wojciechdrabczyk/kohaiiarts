import { Link } from '@inertiajs/react';
import React from 'react';

export default function NavItem({ name, label, className = '' }: { name: string; label: string; className?: string }) {
    const [touched, setTouched] = React.useState(false);
    const routeActive = route().current(name);

    const isActive = name === 'home'
        ? touched && routeActive
        : routeActive;

    const base =
        'rounded px-5 py-2.5 border-2 font-medium transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black';
    const inactive =
        'border-[#822a59] text-[#6e1f48] hover:bg-[#822a59] hover:text-white active:bg-[#561335] active:text-white dark:text-[#822a59] dark:hover:bg-[#6e1f48] dark:hover:text-white dark:active:bg-[#3a0e25]';
    const active = 'border-[#822a59] bg-[#822a59] text-white dark:text-white dark:bg-[#6e1f48] dark:border-[#6e1f48]';

    return (
        <Link
            href={route(name)}
            className={[base, isActive ? active : inactive, className].join(' ')}
            aria-current={isActive ? 'page' : undefined}
            prefetch
            onClick={() => setTouched(true)}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
            {label}
        </Link>
    );
}
