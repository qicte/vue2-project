const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // 关闭语法提示
  lintOnSave: false,
  // 代理解决跨域
  devServer: {
    proxy: {
      '/api': {
        // 目标路径
        target: 'http://gmall-h5-api.atguigu.cn',
        // 路径重写，不过该项目路径都带有api，所有不用到
        // pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
