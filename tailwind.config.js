module.exports = {
  content: ['./src/{pages,components}/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        'proxima-nova': ['Proxima Nova', 'sans-serif'],
        'motiva-sans': ['Motiva Sans', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss-radix')()]
}
