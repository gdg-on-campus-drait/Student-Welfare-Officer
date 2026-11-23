/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F8',
          subtle: '#F6F1F4',
        },
        lavender: {
          DEFAULT: '#E8DDEC',
          light: '#EFE7F3',
          border: '#D9C8DE',
          dark: '#D0BED6',
        },
        lilac: {
          DEFAULT: '#F2ECF5',
          soft: '#F8F4FA',
        },
        plum: {
          DEFAULT: '#51264F',
          deep: '#3B1939',
          light: '#683665',
          subtle: '#8C5688',
        },
        charcoal: {
          DEFAULT: '#29232C',
          muted: '#5C5461',
          subtle: '#827987',
          faint: '#A69FA9',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.22em',
        'extra-wide': '0.15em',
        tightest: '-0.035em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(81, 38, 79, 0.08)',
        'editorial-lg': '0 30px 60px -20px rgba(81, 38, 79, 0.12)',
        'subtle': '0 2px 10px rgba(81, 38, 79, 0.04)',
      },
    },
  },
  plugins: [],
}
