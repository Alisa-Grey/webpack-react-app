import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  target: ['web', 'es5'],
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'assets'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

export default config;
