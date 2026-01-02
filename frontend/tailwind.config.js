/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F5132', // Deep Green
                    dark: '#0A3622',
                    light: '#198754',
                },
                secondary: {
                    DEFAULT: '#FFF9F0', // Cream/White backgrounds
                    dark: '#F5E6D3',
                    light: '#FFFBF5',
                },
                accent: {
                    DEFAULT: '#20C997', // Light Teal
                    dark: '#198754',
                    light: '#6FD9B7',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                arabic: ['Cairo', 'Tajawal', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
