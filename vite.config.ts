import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        server: { hmr: { overlay: false } },

        optimizeDeps: {
            include: ['@hello-pangea/dnd'],
        },
        ssr: {
            noExternal: ['@hello-pangea/dnd'],
        },
    };
});
