const StaticCountPlugin = require('./plugin/staticCountPlugin.js')

module.exports = {
    configureWebpack: {
        plugins: [new StaticCountPlugin()]
    },
    devServer: {
        proxy: 'http://10.19.133.122/' // 内部联调环境-122
    }
};
