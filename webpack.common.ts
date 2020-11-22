import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
const config: Configuration = {
  entry: './client/src/index.tsx',
  resolve: { extensions: ['.jsx', '.js', '.ts', '.tsx'] },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/public/index.html',
      favicon: './client/public/favicon.ico',
    }),
  ],
};
export default config;
