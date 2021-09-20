const HTMLWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/json', to: './json' },
      ],
    }),
  ],
};
