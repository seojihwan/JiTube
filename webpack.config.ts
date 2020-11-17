import commonConfig from './webpack.common';
import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';
import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';

const config = (env: any) => {
  const mode = env.development ? 'development' : 'production';
  switch (mode) {
    case 'development':
      return merge<Configuration>(commonConfig, devConfig);
    case 'production':
      return merge<Configuration>(commonConfig, prodConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};

export default config;
