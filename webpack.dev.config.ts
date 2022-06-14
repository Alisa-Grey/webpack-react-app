import path from 'path';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import common from './webpack.common.config';
import { HotModuleReplacementPlugin } from 'webpack';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
});
