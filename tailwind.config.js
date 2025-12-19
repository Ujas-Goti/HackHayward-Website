/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                grotesk: "'Space Grotesk','sans-serif'",
                exo2: "'Exo 2','sans-serif'",
                mono: "'Space Mono', 'monospace'",
                robo: " 'Roboto', 'sans-serif'",
            },
            keyframes: {
                shine: {
                    '0%': { 'background-position': '100%' },
                    '100%': { 'background-position': '-100%' },
                },
                'neon-pulse': {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)', filter: 'blur(150px)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.15)', filter: 'blur(180px)' },
                },
                'neon-pulse-delayed': {
                    '0%, 100%': { opacity: '0.25', transform: 'scale(1) translate(0, 0)', filter: 'blur(180px)' },
                    '50%': { opacity: '0.5', transform: 'scale(1.2) translate(20px, -20px)', filter: 'blur(200px)' },
                },
                'neon-pulse-slow': {
                    '0%, 100%': { opacity: '0.2', transform: 'scale(1) translate(0, 0)', filter: 'blur(160px)' },
                    '50%': { opacity: '0.45', transform: 'scale(1.25) translate(-30px, 30px)', filter: 'blur(190px)' },
                },
                'neon-sweep': {
                    '0%': { opacity: '0', transform: 'translateX(-200px) scaleY(0.5)' },
                    '50%': { opacity: '0.7', transform: 'translateX(0) scaleY(1)' },
                    '100%': { opacity: '0', transform: 'translateX(200px) scaleY(0.5)' },
                },
                'neon-sweep-delayed': {
                    '0%': { opacity: '0', transform: 'translateX(200px) scaleY(0.5)' },
                    '50%': { opacity: '0.6', transform: 'translateX(0) scaleY(1)' },
                    '100%': { opacity: '0', transform: 'translateX(-200px) scaleY(0.5)' },
                },
                'neon-sweep-slow': {
                    '0%': { opacity: '0', transform: 'translateY(-100px) scaleX(0.5)' },
                    '50%': { opacity: '0.65', transform: 'translateY(0) scaleX(1)' },
                    '100%': { opacity: '0', transform: 'translateY(100px) scaleX(0.5)' },
                },
                'neon-scan': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
            },
            animation: {
                shine: 'shine 5s linear infinite',
                'neon-pulse': 'neon-pulse 4s ease-in-out infinite',
                'neon-pulse-delayed': 'neon-pulse-delayed 5s ease-in-out infinite',
                'neon-pulse-slow': 'neon-pulse-slow 6s ease-in-out infinite',
                'neon-sweep': 'neon-sweep 8s ease-in-out infinite',
                'neon-sweep-delayed': 'neon-sweep-delayed 10s ease-in-out infinite',
                'neon-sweep-slow': 'neon-sweep-slow 12s ease-in-out infinite',
                'neon-scan': 'neon-scan 15s linear infinite',
            },
        },
    },

    plugins: [require('tailwindcss-animated'), require('daisyui')],
};
