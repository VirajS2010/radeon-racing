import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#000000',
        surface: '#0a0a0a',
        card:    '#111111',
        line:    '#1c1c1c',
        radeon: {
          DEFAULT: '#D71920',
          bright:  '#FF2A32',
          deep:    '#480F11',
        },
        chalk:  '#F5F5F7',   // Apple's off-white
        muted:  '#86868B',   // Apple secondary text grey
        faint:  '#424245',   // Apple tertiary
        silver: '#C0C0C0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-anton)', 'sans-serif'],
        heading: ['var(--font-anton)', 'sans-serif'],
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.015em',
      },
      borderRadius: {
        brand: '18px',
        pill:  '9999px',
        sharp: '6px',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':   'fade-in 1s ease forwards',
        'scale-in':  'scale-in 1s cubic-bezier(0.22,1,0.36,1) forwards',
        marquee:     'marquee 28s linear infinite',
        'pulse-soft':'pulse-soft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
