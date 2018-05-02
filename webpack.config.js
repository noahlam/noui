const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const config = {
  entry: './example/index.js',
  output: {
    path:path.resolve('./dist'),
    filename: "index.js"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue',
      '@': path.resolve(__dirname, './example'),
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules'},
      { test: /\.vue$/, loader: 'vue-loader'},
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.(jpe?g|png|gif)$/i,  loader: 'url-loader',},
    ]
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    port:9999,
    contentBase: path.join(__dirname, "dist")
  },

}

module.exports = config