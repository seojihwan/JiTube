import path from 'path';
import RefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development',
  entry: './client/src/index.tsx',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  esmodules: true,
                },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: ['react-refresh/babel'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: { extensions: ['.jsx', '.js', '.ts', '.tsx'] },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/public/'),
    publicPath: '/',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new RefreshWebpackPlugin()],
};
export default config;
