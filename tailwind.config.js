module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['**/*.html', '**/*.ts']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    borderStyle: ['hover', 'focus'],
    borderWidth: ['hover', 'focus'],
  },
  plugins: [],
});
