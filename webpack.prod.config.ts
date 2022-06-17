import { merge } from 'webpack-merge';
import common from './webpack.common.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default merge(common, {
  mode: 'production',
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});
