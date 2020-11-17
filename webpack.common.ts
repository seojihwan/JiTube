import path from 'path';
import { Configuration } from 'webpack';
const config: Configuration = {
  entry: './client/src/index.tsx',
  resolve: { extensions: ['.jsx', '.js', '.ts', '.tsx'] },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
};
export default config;
