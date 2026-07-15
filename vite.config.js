import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

function scanPages(directory) {
    const entries = [];

    for (const dirent of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, dirent.name);

        if (dirent.isDirectory()) {
            entries.push(...scanPages(fullPath));
            continue;
        }

        if (dirent.isFile() && fullPath.endsWith('.jsx')) {
            const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
            entries.push(relativePath);
        }
    }

    return entries;
}

const pageEntries = scanPages(path.resolve('resources/js/Pages'));

export default defineConfig({
    base: './',
    plugins: [
        laravel({
            input: ['resources/js/app.jsx', ...pageEntries],
            refresh: true,
        }),
        react(),
    ],
    server: {
        port: 5183,
        strictPort: true,
    },
});
