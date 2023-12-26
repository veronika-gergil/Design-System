const path = require('path');

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, 'source', 'js', 'index.js'),
  output: {
    filename: 'bundle.js',
  },
};

module.exports = config;
