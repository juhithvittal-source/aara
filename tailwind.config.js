/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: '#4A0E17',
          'burgundy-dark': '#2D080E',
          'burgundy-deep': '#1D0509',
          maroon: '#3B0910',
          wine: '#5C121E',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#AA820A',
          'gold-bronze': '#C5A059',
          champagne: '#EED9A4',
          ivory: '#FAF7F2',
          cream: '#F4ECE4',
          sand: '#E2D5C8',
          noir: '#0C0809',
          charcoal: '#171113',
          card: 'rgba(30, 10, 15, 0.75)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FFF2B2 50%, #D4AF37 100%)',
        'burgundy-gradient': 'linear-gradient(180deg, #1D0509 0%, #2D080E 50%, #150306 100%)',
        'royal-gradient': 'linear-gradient(135deg, #2D080E 0%, #4A0E17 50%, #1D0509 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.4)',
        'burgundy-deep': '0 20px 40px -15px rgba(15, 3, 5, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
