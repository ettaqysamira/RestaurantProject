/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'libre-caslon': ['Libre Caslon', 'serif'],
        'noah': ['Noah', 'sans-serif'],
      },
      colors: {
        customColor: '#c19d60', 
      },
    },
    keyframes: {
      bounce: {
        '0%, 100%': {
          transform: 'translateY(0)',
          'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'translateY(-30px)',
          'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
    animation: {
      'bounce_2s_infinite': 'bounce 0.5s infinite',
    },
  },
  plugins: [],
}





