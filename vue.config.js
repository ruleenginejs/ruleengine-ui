module.exports = {
  chainWebpack: config => {
    config.externals({
      "vue": "vue",
      "debounce": "debounce"
    })
  },
  configureWebpack: {
    devtool: process.env.NO_SOURCE_MAP ? false : "source-map",
    plugins: []
  }
}
