const path = require('path');

const xPath = filepath => path.resolve(__dirname, filepath);

// Webpack
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PwaManifestPlugin = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');

// configs
const envConfig = require('./.env.js');

module.exports = function webpackConfig(env, argv) {
  const isProduction = argv.mode === 'production';

  const stats = {
    modules: false,
    children: false,
    chunks: false,
  };

  const development = {
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      watchContentBase: true,
      stats,
      publicPath: '/',
      historyApiFallback: {
        disableDotRule: true,
      },
      hot: true,
      host: '0.0.0.0',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };

  const production = {
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
      noEmitOnErrors: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[hash].[name].css',
      }),
      new OfflinePlugin({
        appShell: '/',
        responseStrategy: 'network-first',
        autoUpdate: true,
      }),
    ],
    performance: { hints: false },
  };

  let appEnvConfig = {
    NODE_ENV: argv.mode,
    isProduction,
    ...envConfig,
  };

  if (isProduction) {
    appEnvConfig = { ...appEnvConfig, ...require('./.env.production.js') }; // eslint-disable-line
  }

  const finalConfig = merge(
    {
      entry: {
        main: xPath('src/index.js'),
        'app-sw': xPath('src/sw.js'),
        'firebase-messaging-sw': xPath('src/sw-fcm.js'),
      },
      output: {
        filename: '[name].js',
        chunkFilename: '[hash].[name].chunk.js',
        publicPath: '/',
        globalObject: 'this',
      },
      resolve: {
        alias: { '@': xPath('src') },
        extensions: ['.js', '.jsx', '.scss', '.css'],
        modules: [xPath('node_modules')],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(appEnvConfig),
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        }),
        new HtmlWebpackPlugin({
          chunks: ['main', 'vendors~main'],
          minify: isProduction
            ? {
              collapseWhitespace: true,
              preserveLineBreaks: true,
              removeComments: true,
            }
            : null,
          filename: 'index.html',
          template: xPath('src/templates/main.html'),
          favicon: xPath('src/assets/favicon.ico'),
        }),
        new PwaManifestPlugin({
          name: 'Ninja',
          short_name: 'Ninja',
          description: '',
          background_color: '#1A1919',
          theme_color: '#1A1919',
          'theme-color': '#1A1919',
          start_url: '/',
          icons: [
            {
              src: xPath('src/assets/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
            },
          ],
        }),
      ],
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: { minimize: isProduction },
              },
            ],
          },
          {
            test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'raw-loader',
          },
          {
            test: /\.(png|gif|jpe?g|svg|webp)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
              'image-webpack-loader',
              {
                loader: 'file-loader',
                options: {
                  name: '[hash].[ext]',
                  outputPath: 'images/',
                  verbose: false,
                },
              },
            ],
          },
          {
            test: /\.(eot|tiff|woff2|woff|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[hash].[ext]',
                  outputPath: 'fonts/',
                  verbose: false,
                },
              },
            ],
          },
        ],
      },
      stats,
    },
    isProduction ? production : development,
  );

  return finalConfig;
};
