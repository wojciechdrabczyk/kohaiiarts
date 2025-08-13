import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { ReactNode } from 'react';


type AppWithLayout = {
    layout?: (page: ReactNode) => ReactNode;
};

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    title: (title) => `${title} — ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const layout = (App as AppWithLayout).layout || ((page: ReactNode) => page);

        root.render(layout(<App {...props} />));
    },
    progress: {
        color: '#4B5563',
    },
});

// Initialize light/dark theme
initializeTheme();
