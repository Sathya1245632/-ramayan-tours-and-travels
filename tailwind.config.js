/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                saffron: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#FF7A00',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                gold: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#D4AF37',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                charcoal: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Poppins', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'fade-in-up': 'fade-in-up 0.6s ease-out',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 122, 0, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 122, 0, 0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'saffron-gradient': 'linear-gradient(135deg, #FF7A00, #D4AF37)',
                'hero-gradient': 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 50%, rgba(255,122,0,0.3) 100%)',
            },
        },
    },
    plugins: [],
};
