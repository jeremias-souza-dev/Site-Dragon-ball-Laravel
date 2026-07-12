import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                void: '#0d0906',
                ember: '#181009',
                'ember-2': '#221607',
                line: '#3a2a17',
                'ki-orange': '#ff6a1f',
                'ki-orange-dim': '#c9531c',
                'kame-blue': '#35c2e0',
                'saiyan-gold': '#ffcf5c',
                parchment: '#f2e9dd',
                ash: '#a99c8a',
                danger: '#e6402f',
                good: '#3ecf6a',
            },
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
                display: ['Anton', ...defaultTheme.fontFamily.sans],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
            },
        },
    },

    plugins: [forms],
};
