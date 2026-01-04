/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-orange': '#ea580c',
                'brand-slate': '#0f172a',
            },
        },
    },
    plugins: [],
}
