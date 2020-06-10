const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'lib',
  publicPath: 'yz-dync-form',
  productionSourceMap: false,
  filenameHashing: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('yz-dync-form', resolve(''))
  }
}
