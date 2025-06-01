/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontSize: {
      '3sm': ['8px', '10px'],
      '2sm': ['10px', '12px'],
      'b-sm': ['12px', '16px'],
      'sm': ['14px', '20px'],
      'base': ['16px', '24px'],
      'lg': ['20px', '28px'],
      'xl': ['24px', '32px'],
      '2xl': ['32px', '40px'],
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    },
    extend: {
      spacing: {
        '128': '32rem',
        '132': '36rem',
        '160': '40rem',
        '180': '50rem',
        '192': '56rem',
        '256': '64rem',
      },
    },
  },
};