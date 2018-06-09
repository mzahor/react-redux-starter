/* global __dirname, process */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function webpackConfig(env = {}) {
  const ENV = env.NODE_ENV || 'local';
  const isProd = ENV !== 'local';
  const isLocal = ENV === 'local';
  const isSSR = env.ssr;
  const isWeb = !isSSR;
  const ifSSR = x => isSSR && x;
  const ifWeb = x => isWeb && x;
  const ifProd = x => isProd && x;
  const ifLocal = x => isLocal && x;
  const ifAnalyzer = x => env.analyze && x;
  const removeEmpty = arr => arr.filter(Boolean);

  const webEntry = {
    'main': './src/index.js',
  };

  const ssrEntry = {
    'main-ssr': './src/ssr-index.js',
  };

  const compilationPaths = [
    path.resolve(__dirname, 'src'),
  ];

  const config = {
    entry: isWeb ? webEntry : ssrEntry,
    mode: isLocal ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].bundle.js',
      libraryTarget: isSSR ? 'commonjs2' : 'var',
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'src'),
          enforce: 'pre',
          use: 'source-map-loader',
        },
        {
          include: compilationPaths,
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader'
          },
        },
        ifWeb({
          test: /\.s?css$/,
          include: compilationPaths,
          sideEffects: true,
          use: [
            isLocal ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: true,
                importLoaders: 1,
                minimize: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => autoprefixer(),
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
        ifSSR({
          test: /\.s?css$/,
          use: 'ignore-loader',
        }),
      ]),
    },
    optimization: {
      noEmitOnErrors: true,
      minimizer: removeEmpty([
        ifWeb(ifProd(new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true,
          },
          sourceMap: true,
        }))),
      ]),
    },
    plugins: removeEmpty([
      ...(ifWeb([
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': `'${ENV}'`
        }),
        new MiniCssExtractPlugin({
          filename: '[name].bundle.css',
          disable: isLocal,
        }),
        new webpack.ProvidePlugin({
          Promise: 'promise-polyfill',
          fetch: 'unfetch',
        }),
        new HtmlWebpackPlugin({
          inject: false,
          template: './index.ejs',
          templateParameters: {
            production: isProd,
          }
        }),
        ifProd(new webpack.SourceMapDevToolPlugin({
          publicPath: 'http://localhost:5050/',
          filename: '[file].bundle.map',
        })),
        ifAnalyzer(new BundleAnalyzerPlugin()),
      ]) || []),
    ]),

    node: {
      global: true,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false,
    },

    target: isSSR ? 'node' : 'web',

    devtool: isProd ? false : 'cheap-module-eval-source-map',
  };

  return config;
};
