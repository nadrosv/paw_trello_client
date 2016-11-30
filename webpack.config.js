// webpack.config.js

module.exports = {
  // the main entry of our app
  entry: './src/index.js',
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },

  module: {
    loaders: [
      // process *.vue files using vue-loader
      { test: /\.vue$/, loader: 'vue' },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },

   vue: {
    loaders: {
      js: 'babel'
    }
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
}