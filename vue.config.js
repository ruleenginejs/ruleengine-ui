module.exports = {
  chainWebpack: config => {
    if (process.env.BUILD_LIB) {
      config.externals({
        "vue": "vue",
        "debounce": "debounce",
        "splitview.js": "splitview.js",
        "@svgdotjs/svg.js": "@svgdotjs/svg.js"
      })
    }
  },
  configureWebpack: {
    devtool: process.env.NO_SOURCE_MAP ? false : "source-map",
    plugins: []
  }
}
