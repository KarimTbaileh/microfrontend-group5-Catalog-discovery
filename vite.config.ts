import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

export default defineConfig(({ mode }) => {
    const isMfe = mode === 'mfe';

    return {
        base: './',
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env': JSON.stringify({ NODE_ENV: 'production' }),
        },
        plugins: [
            react(),
            tailwindcss(),
            ...(isMfe ? [cssInjectedByJs()] : []),
        ],
        build: isMfe
            ? {
                outDir: 'dist-mfe',
                emptyOutDir: true,
                target: 'es2022',
                lib: {
                    entry: 'src/mfe.tsx',
                    formats: ['es'],
                    fileName: () => 'luxe-catalog.js',
                },
                rollupOptions: {
                    output: {
                        inlineDynamicImports: true,
                    },
                },
                assetsInlineLimit: 1024 * 512,
                cssCodeSplit: false,
            }
            : {
                outDir: 'dist',
                emptyOutDir: true,
                target: 'es2022',
            },
    };
});