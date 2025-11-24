const StaticCountPlugin = require('./plugin/staticCountPlugin.js')

module.exports = {
    publicPath: './', // 添加相对路径配置，确保GitHub Pages能正常访问静态资源
    configureWebpack: {
        plugins: [new StaticCountPlugin()],
        devtool: 'source-map' // 生成source map
    },
    productionSourceMap: false, // 为生产环境生成source map
    devServer: {
        proxy: 'http://10.19.133.122/' // 内部联调环境-122
    }
};
