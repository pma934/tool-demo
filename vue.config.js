const StaticCountPlugin = require('./plugin/staticCountPlugin.js')

module.exports = {
    configureWebpack: {
        plugins: [new StaticCountPlugin()],
        devtool: 'source-map' // 生成source map
    },
    productionSourceMap: false, // 为生产环境生成source map
    devServer: {
        proxy: 'http://10.19.133.122/' // 内部联调环境-122
    }
};
