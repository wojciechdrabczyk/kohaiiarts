import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggleFloating() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'light');
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    const Icon = theme === 'dark' ? FaSun : FaMoon;

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-full bg-white dark:bg-gray-800 p-3 shadow-lg border border-gray-200 dark:border-gray-600 md:hidden"
        >
            <Icon className="text-gray-700 dark:text-gray-200" />
            <span className="text-sm text-gray-700 dark:text-gray-200">
                {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </span>
        </button>
    );
}
