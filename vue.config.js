const path = require("path");
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A" // 默认主题颜色
          // "link-color": "#1DA57A",
          // "border-radius-base": "2px"
        },
        javascriptEnabled: true,
        import: path.resolve(
          __dirname,
          "./node_modules/ant-design-vue/lib/style/themes/default.less"
        )
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有所有 loader
    // 如果你不这样做,接下来 loader 会附加在该规则现有的 loader 之后.
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  }
};
