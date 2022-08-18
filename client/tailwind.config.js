/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', '"Arial"', "sans-serif"]
    },
    colors: {
      'primary': {
        300: "#6E0AD6",
        500: "#640DBD",
        600: "#590fa6"
      },
      'text': {
        DEFAULT: "#F2F2F2",
        'soft': "#9da5c4"
      },
      'background': "#1C2128",
      'background-odd': "#1a1e24", 
      'secondary': "#57CF2D"
    },
    extend: {
      backgroundImage: {
        "bars": "url('./background-image.svg')"
      }
    },
  },
  plugins: [],
}
