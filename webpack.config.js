const path = require('path');
const pages = ['index'];

const entries = pages.reduce((total, elem) => ({
  ...total,
  [elem]: path.resolve(__dirname, 'source', 'js', `${elem}.js`),
}), {});

const config = {
  mode: 'production',
  entry: entries,
  output: {
    filename: '[name].bundle.js',
  },
};

module.exports = config;
