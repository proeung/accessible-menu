const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './public/**/*.{html,js}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      purple: colors.purple,
      red: colors.red,
      blue: colors.blue,
    },
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily: {
      'sans': [
        'SofiaPro',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
      ],
      'sans-secondary': [
        'Heebo',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
      ],
    },
    extend: {
      spacing: {
        '70': '4.375rem',
        '100': '6.25rem',
        '310': '19.375rem',
      },
      fontSize: {
        xs: '0.75rem', //12px
        sm: '0.875rem', //14px
        base: '1rem', //16px
        lg: '1.125rem', //18px
        xl: '1.25rem', //20px
        '2xl': '1.375rem', //22px
        '3xl': '1.875rem', //30px
        '4xl': '2.25rem', //36px
        '5xl': '2.625rem', //42px
      },
    },
  },
  plugins: [],
}
