const path = require('path');

module.exports = {
  entry: {
    node: './src/node/index.ts',
    browser: './src/browser/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     // 这表明将选择哪些 chunk 进行优化
  //     chunks: 'all',
  //     // 拆分前必须共享模块的最小 chunks 数
  //     minChunks: 1,
  //     // webpack 将使用 chunk 的来源和名称生成名称
  //     automaticNameDelimiter: '~',
  //     cacheGroups: {
  //       vendors: {
  //         name: `index`,
  //         test: /[\\/]index.ts/,
  //         priority: -10,
  //         chunks: 'initial'
  //       },
  //       cli: {
  //         name: `cli`,
  //         priority: -20,
  //         chunks: 'initial',
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'umd',
      name: '___umd___',
    }
  }
};
