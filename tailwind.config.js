/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        leadq: {
          bg: '#000000', // Pure black
          platinum: '#E5E7EB', // Platinum for headings
          steel: '#6B7280', // Steel grey for body text
          silver: '#C0C0C0', // Metallic silver for highlights
          'silver-light': '#D4D4D4', // Light silver variant
          'platinum-bright': '#F0F0F0', // Bright platinum
          cyan: '#06b6d4',
          'cyan-bright': '#00D4FF',
          magenta: '#FF1493',
          'magenta-dark': '#FF006E',
          purple: '#7c3aed',
          amber: '#f59e0b',
          'amber-dark': '#d97706',
          'royal-blue': '#0066FF',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
