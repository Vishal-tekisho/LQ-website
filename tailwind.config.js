/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        leadq: {
          bg: '#08082A', // Deep navy from app design
          platinum: '#E5E7EB', // Platinum for headings
          steel: '#8B87B3', // Muted lavender for body text
          silver: '#C4C0E8', // Lavender-tinted white for body/subtext
          'silver-light': '#D8D4F0', // Light lavender variant
          'platinum-bright': '#F0F0F0', // Bright platinum
          cyan: '#A89FE0', // Soft lavender
          'cyan-bright': '#7B6FD4',
          magenta: '#FF1493',
          'magenta-dark': '#FF006E',
          purple: '#7B6FD4', // Primary accent purple
          'purple-light': '#A89FE0', // Light lavender for hovers
          'purple-dark': '#5B4FBE', // Deep purple for gradients
          'purple-glow': '#9B8FEF', // Bright purple for glow effects
          amber: '#f59e0b',
          'amber-dark': '#d97706',
          'royal-blue': '#7B6FD4', // Stronger purple
          'deep-blue': '#5B4FBE', // Deep purple for gradients
          'navy-mid': '#12124A', // Mid-tone navy
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"DM Sans"', 'serif'],
        mono: ['"DM Sans"', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
