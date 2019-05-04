const path = require('path');
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminGifsicle = require('imagemin-gifsicle');
// const imageminOptipng = require('imagemin-optipng');
// const imageminSvgo = require('imagemin-svgo');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const templateParameters = require('./src/template-parameters.js');

module.exports = {
  mode: 'production',
  entry: [
    './src/js/index.js',
    './src/css/main.css',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'src/js/bundle.js',
  },
  stats: {
    colors: true,
    modules: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    env: true,
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
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
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
      //   test: /\.(jpe?g|png|gif|svg)$/i,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'src/css/main.css',
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/fonts'),
    //     to: path.resolve(__dirname, 'public/src/fonts'),
    //   },
    //   {
    //     from: path.resolve(__dirname, 'src/img'),
    //     to: path.resolve(__dirname, 'public/src/img'),
    //   },
    // ]),
    
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html'),
      filename: path.resolve(__dirname, 'public/index.html'),
    }),
    
    // new ImageminPlugin({ 
      
    //   plugins: [
    //     imageminMozjpeg({quality: 10}),
    //     imageminJpegtran({progressive: true}),
    //     imageminGifsicle({interlaced: true}),
    //     imageminSvgo({removeViewBox: true}),
    //     imageminOptipng({optimizationLevel: 10}),
    //   ],
    //   pngquant: ({quality: 75-90}),
    // }),
  ],
};
