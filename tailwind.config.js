module.exports = {
  important: true, // to generate utilities as !important
  content: [ // add the paths to all of your template files
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: { // add new font family
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        primary: '#34d399'
      }
    }
  },
  plugins: []
};