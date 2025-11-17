import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.jsx', './src/**/*.js', './src/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          accent: '#facc15',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 35px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [typography],
};

export default config;

