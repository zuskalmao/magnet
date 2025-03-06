/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magnet: {
          primary: '#E7256A',  // Bright magenta/pink (north pole)
          secondary: '#1E90FF', // Blue (south pole)
          dark: '#121212',
          light: '#FAFAFA',
          gray: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'attract': 'attract 3s ease-in-out infinite',
        'rotate': 'rotate 10s linear infinite',
        'magnetic-glow': 'magnetic-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        attract: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        "magnetic-glow": {
          '0%, 100%': {
            'box-shadow': '0 0 20px 5px rgba(231, 37, 106, 0.3)'
          },
          '50%': {
            'box-shadow': '0 0 30px 10px rgba(231, 37, 106, 0.5)'
          }
        }
      },
    },
  },
  plugins: [],
}
