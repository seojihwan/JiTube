const path = require('path');
const config = {
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
  },
  resolve: {
    modules: [path.join(__dirname, '..', 'app'), 'node_modules'],
    extensions: ['.css', '.tsx', '.ts'],
  },
};

module.exports = config;
