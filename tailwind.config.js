/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        leadq: {
          bg: '#05060e', // Updated based on logo analysis
          platinum: '#E5E7EB', // Platinum for headings
          steel: '#6B7280', // Steel grey for body text
          silver: '#C0C0C0', // Metallic silver for highlights
          'silver-light': '#D4D4D4', // Light silver variant
          'platinum-bright': '#F0F0F0', // Bright platinum
          cyan: '#4fa4c4', // Updated based on logo analysis
          'cyan-bright': '#00D4FF',
          magenta: '#FF1493',
          'magenta-dark': '#FF006E',
          purple: '#bfa9c9', // Updated to match logo purple
          amber: '#f59e0b',
          'amber-dark': '#d97706',
          'royal-blue': '#2751a9', // Updated based on logo analysis
          'deep-blue': '#152d63', // Added based on logo analysis
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
