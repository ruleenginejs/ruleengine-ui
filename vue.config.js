module.exports = {
  chainWebpack: config => {
    config.externals({})
  },
  configureWebpack: {
    devtool: process.env.NO_SOURCE_MAP ? false : "source-map",
    plugins: []
  }
}
