import { Link } from '@inertiajs/react';
import React from 'react';

export default function NavItem({ name, label, className = '' }: { name: string; label: string; className?: string }) {
    const [touched, setTouched] = React.useState(false);
    const routeActive = route().current(name);
    const isActive = name === 'home' ? touched && routeActive : routeActive;
    const base =
        'rounded px-5 py-2.5 border-2 font-medium ' +
        'transition-colors duration-200 ease-in-out ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 ' +
        'dark:focus-visible:ring-[#c59d36] dark:focus-visible:ring-offset-black';
    const lightInactive = 'border-[#822a59] text-[#6e1f48] ' + 'hover:bg-[#822a59] hover:text-white ' + 'active:bg-[#561335] active:text-white';
    const lightActive = 'border-[#822a59] bg-[#822a59] text-white';
    const darkInactive = 'dark:border-[#c59d36] dark:text-[#c59d36] ' + 'dark:hover:bg-[#4a3717]/30 ' + 'dark:active:bg-[#4a3717]/40';
    const darkActive = 'dark:border-[#c59d36] dark:bg-[#c59d36]/20 dark:text-[#c59d36] ' + 'dark:hover:bg-[#c59d36]/22';
    const inactive = [lightInactive, darkInactive].join(' ');
    const active = [lightActive, darkActive].join(' ');

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
