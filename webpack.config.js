const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname + '/dist')
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve('ts-loader')
      }
    ]
  }
};
