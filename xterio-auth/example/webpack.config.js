// webpack.config.js
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    hot: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'dist')
      // publicPath: '/'
    }
    // compress: true
    // allowedHosts: []
  }
}
