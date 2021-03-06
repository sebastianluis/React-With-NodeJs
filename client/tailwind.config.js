module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { 
      width: {
        '200': '175px'
       }
    },
    fontFamily: {
      sans: ['Questrial', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      turquoise: {
        light: '#6acecc',
        DEFAULT: '#05aea6',
        dark: '#019091',
      },
      blue: {
        DEFAULT: '#132e48',
        light: "#ADD8E6",
        dark: "#00008B"
      },
      black: {
        dark: '#00000',
      },
      yellow: {
        DEFAULT: '#e8bc10',
      },
      green: {
        DEFAULT: '#056947',
        dark: '#056947'
      },
      brown: {
        light: '#ae4700',
        DEFAULT: '#802e0e',
        dark: '#802e0e',
      },
      gray: {
        darkest: '#1f2d3d',
        dark: '#3c4858',
        DEFAULT: '#c0ccda',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      red: {
        light: "#ff0000"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
