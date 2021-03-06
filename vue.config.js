module.exports = {
  devServer: {
    host:'localhost',
    port:8081,
    proxy:{
      '/api':{
        target:'http://localhost:8087',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  // http://rap2.taobao.org:38080/app/mock/264023
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,eslent校验关闭
  productionSourceMap:false,
	// 可以防止组件文件在第一次一次性全加载出来
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}