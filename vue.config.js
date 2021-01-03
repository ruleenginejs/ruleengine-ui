module.exports = {
  chainWebpack: config => {
    if (process.env.BUILD_LIB) {
      config.externals({})
    }
  },
  configureWebpack: {
    devtool: process.env.NO_SOURCE_MAP ? false : "source-map",
    plugins: []
  }
}
