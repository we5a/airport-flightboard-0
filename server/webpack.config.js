const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals({modulesDir: path.join(__dirname, 'node_modules')})],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};