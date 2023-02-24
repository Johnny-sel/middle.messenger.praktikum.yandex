const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'app', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@app/actions': path.resolve(__dirname, 'src/app/actions'),
      '@app/utils': path.resolve(__dirname, 'src/app/utils'),
      '@app/functions': path.resolve(__dirname, 'src/app/functions'),
      '@app/pages': path.resolve(__dirname, 'src/app/pages'),
      '@app/components': path.resolve(__dirname, 'src/app/components'),
      '@app/types': path.resolve(__dirname, 'src/app/types'),
      '@app/resources': path.resolve(__dirname, 'src/app/resources'),
      '@app/modules': path.resolve(__dirname, 'src/app/modules'),
      '@app/constants': path.resolve(__dirname, 'src/app/constants'),
      '@app/img': path.resolve(__dirname, 'src/app/static/img'),
      '@app/styles': path.resolve(__dirname, 'src/app/styles'),
      '@core/http': path.resolve(__dirname, 'src/core/http/http.ts'),
      '@core/component': path.resolve(__dirname, 'src/core/component/component.ts'),
      '@core/router': path.resolve(__dirname, 'src/core/router/router.ts'),
      '@core/tags': path.resolve(__dirname, 'src/core/vdom/tags/tags.ts'),
      '@core/types': path.resolve(__dirname, 'src/core/types.ts'),
      '@core/utils': path.resolve(__dirname, 'src/core/utils'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@api/sockets/chat': path.resolve(__dirname, 'src/api/sockets/chat.ts'),
      '@api/repositories': path.resolve(__dirname, 'src/api/repositories'),
      '@api/types': path.resolve(__dirname, 'src/api/types'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    port: 1234,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'app', 'static'),
          to: './assets',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'app', 'index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};
