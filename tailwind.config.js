/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include your Vite HTML entry point
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans'], // Add your font family here
      Roboto: ['Roboto'], // Add your font family here
      goldman: ['Goldman'], // Add your font family here
      quicksand: ['Quicksand'], // Add your font family here
    },
    extend: {
      textShadow: {
        'neon-blue': '0 0 2px rgba(147, 197, 253, 0.8), 0 0 4px rgba(147, 197, 253, 0.7), 0 0 6px rgba(147, 197, 253, 0.6), 0 0 8px rgba(147, 197, 253, 0.5)',
        'neon-red': '0 0 2px rgba(220, 38, 38, 0.8), 0 0 4px rgba(220, 38, 38, 0.7), 0 0 6px rgba(220, 38, 38, 0.6), 0 0 8px rgba(220, 38, 38, 0.5)',
        'neon-green': '0 0 2px rgba(74, 222, 128, 0.8), 0 0 4px rgba(74, 222, 128, 0.7), 0 0 6px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.5)',
      },
      colors: {
        'player-gray': '#222222',
      },
      backgroundImage: {
        'player-bg': 'linear-gradient(45deg, #222222, #171717)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-blue': {
          'text-shadow': '0 0 2px rgba(147, 197, 253, 0.8), 0 0 4px rgba(147, 197, 253, 0.7), 0 0 6px rgba(147, 197, 253, 0.6), 0 0 8px rgba(147, 197, 253, 0.5)',
        },
        '.text-shadow-red': {
          'text-shadow': '0 0 2px rgba(220, 38, 38, 0.8), 0 0 4px rgba(220, 38, 38, 0.7), 0 0 6px rgba(220, 38, 38, 0.6), 0 0 8px rgba(220, 38, 38, 0.5)',
        },
        '.text-shadow-green': {
          'text-shadow': '0 0 2px rgba(74, 222, 128, 0.8), 0 0 4px rgba(74, 222, 128, 0.7), 0 0 6px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.5)',
        }
      })
    },
  ],
}
