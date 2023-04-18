import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  Configuration as WebpackConfig,
  HotModuleReplacementPlugin
} from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
type Configuration = WebpackConfig & {
  devServer?: WebpackDevServerConfig;
};

const buildDirectory = 'dist';
const outputDirectory = buildDirectory + '/client';
const config: Configuration = {
  mode: 'development',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  entry: './src/index.tsx',
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
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true
  }
};

export default config;
