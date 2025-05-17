/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "*.html"],
  theme: {
    extend: {
      scrollBehavior: ["responsive"],
      animation: {
        expire: 'expire 1.5s ease-in-out forwards',
        'pulse-gentle': 'pulse-gentle 3s infinite ease-in-out',
        fadeout: "fadeout 1s ease-in-out",
        spreadout: 'spreadout 1s ease-in-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spreadout: {
          "0%": {
            filter: "blur(1)",
            opacity: "0",
            transform: "translateX(-100%)",
          },
          "100%": {
            filter: "blur(0)",
            opacity: "1",
            transform: "translateX(0%)",
          },
        },
        fadeout: {
          "0%": {
            opacity: "0",
            filter: "blur(8px)",
            transform: "translateY(20%)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0px)",
            transform: "translateY(0%)",
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        expire: {
          '0%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '70%': {
            opacity: '0.5',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.9) translateY(20px)',
            height: '0',
            margin: '0',
            padding: '0',
            overflow: 'hidden'
          }
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' }
        }
      },
    },
  },
  plugins: [],
};