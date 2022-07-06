/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: '#142E38',
        lightGreen: '#d4d7d0',
        mainGreen: '#318161',
        lightYellow: '#FAB65D',
      },
    },
  },
  plugins: [],
};
