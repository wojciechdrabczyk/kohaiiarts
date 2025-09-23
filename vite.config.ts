import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

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

        // 👇 add these two blocks
        optimizeDeps: {
            include: ['@hello-pangea/dnd'],
        },
        ssr: {
            noExternal: ['@hello-pangea/dnd'],
        },
    };
});
