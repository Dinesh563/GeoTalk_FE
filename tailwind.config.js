/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "*.html"],
  theme: {
    extend: {
      scrollBehavior: ["responsive"],
      animation: {
        fadeout: "fadeout 1s ease-in-out",
        spreadout: 'spreadout 1s ease-in-out forwards'
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
      },
    },
  },
  plugins: [],
};
