const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const templateParameters = require('./src/template-parameters.js');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [
    './src/js/index.js',
    './src/css/main.css',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'src/js/bundle.js',
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, './'),
        use: ['raw-loader'],
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'src/fonts/',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'src/img/',
      //     },
      //   },
      // },
    ],
  },
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
    disableHostCheck: true,
    stats: {
      colors: true,
      modules: false,
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      env: true,
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new MiniCssExtractPlugin({
      filename: 'src/css/main.css',
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:9000' }),
    new CopyWebpackPlugin([
      // {
      //   from: path.resolve(__dirname, 'src/fonts'),
      //   to: path.resolve(__dirname, 'public/src/fonts'),
      // },
      // {
      //   from: path.resolve(__dirname, 'src/img'),
      //   to: path.resolve(__dirname, 'public/src/img'),
      // },
      // {
      //   from: path.resolve(__dirname, 'src/favicon.ico'),
      //   to: path.resolve(__dirname, 'public/'),
      // },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html'),
      filename: path.resolve(__dirname, 'public/index.html'),
    }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   templateParameters,
    //   template: path.resolve(__dirname, 'src/404.html'),
    //   filename: path.resolve(__dirname, 'public/404.html'),
    // }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   templateParameters,
    //   template: path.resolve(__dirname, 'src/500.html'),
    //   filename: path.resolve(__dirname, 'public/500.html'),
    // }),
  ],
};
