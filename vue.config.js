module.exports = {
  devServer: {
    port: 8686,     // 端口号
    // 如果需要代理
    // proxy: {
    //   '/api': {
    //     target: 'http://develop.api.caishui.hzjyun.com/',
    //     pathRewrite: { '/api': '/api' },
    //     changeOrigin: true,
    //     logLevel: 'debug'
    //   },
    // }
  },
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: process.env.outputDir,
  //放置生成的静态资源(js、css、img、fonts)的(相对于outputDir)目录
  assetsDir: './static',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/global.scss";`
      }
    }
  },
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      const terserWebpackPlugin = config.optimization.minimizer[0];
      const { terserOptions } = terserWebpackPlugin.options;
      terserOptions.compress.drop_console = true;
      terserOptions.compress.drop_debugger = true;
    }
  }
}