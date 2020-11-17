import path from 'path';
import RefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
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
};
export default config;
