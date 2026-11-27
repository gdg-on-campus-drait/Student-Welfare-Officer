/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F3F6FB',
          100: '#E6ECF5',
          200: '#C9D5E8',
          300: '#9DB1D2',
          400: '#6A86B6',
          500: '#3F5F96',
          600: '#2A4A80',
          700: '#1D3A6B',
          800: '#132B55',
          900: '#0B1E40',
          950: '#06132B',
        },
        gold: {
          50: '#FBF7EA',
          100: '#F5ECCB',
          200: '#EBD894',
          300: '#E0C463',
          DEFAULT: '#C9A13B',
          500: '#C9A13B',
          600: '#A9832A',
          700: '#7F6220', // AA-safe gold text on white
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          subtle: '#64748B',
          faint: '#94A3B8',
        },
        line: '#E5E9F0',
        canvas: '#F7F9FC',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      maxWidth: {
        site: '1320px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,30,64,0.04), 0 8px 24px -12px rgba(11,30,64,0.12)',
        lift: '0 2px 4px rgba(11,30,64,0.04), 0 24px 48px -20px rgba(11,30,64,0.28)',
        nav: '0 1px 0 rgba(11,30,64,0.06), 0 10px 30px -18px rgba(11,30,64,0.25)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        kenburns: 'kenburns 14s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
        fadeUp: 'fadeUp .35s ease-out both',
      },
    },
  },
  plugins: [],
};
