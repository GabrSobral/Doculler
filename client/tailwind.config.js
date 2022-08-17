/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', '"Arial"', "sans-serif"]
    },
    colors: {
      light: {
        'primary': {
          300: "#6E0AD6",
          500: "#640DBD",
          600: "#590fa6"
        },
        'text': {
          DEFAULT: "#494949",
          'soft': "#9da5c4"
        },
        'background': "#FFFFFF",
        'background-odd': "#FCFCFC", 
        'secondary': "#57CF2D"
      },
      dark: {
        'text': "#FFF",
        'background': "#181A1B"
      }
    },
    extend: {
      backgroundImage: {
        "bars-light": "url('./background-image.svg')"
      }
    },
  },
  plugins: [],
}
