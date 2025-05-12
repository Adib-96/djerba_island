module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')()  // cssnano minifies the CSS
  ]
};
