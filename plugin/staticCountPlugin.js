class StaticCountPlugin {
    constructor(option) {
        this.option = option
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('StaticCountPlugin', (compilation, callback) => {
            let static_list = {
                img_list: []
            };
            Object.keys(compilation.assets).forEach(key => {
                if (key.startsWith('img')) {
                    static_list.img_list.push('/' + key)
                }
            });
            const content = JSON.stringify(static_list)
            compilation.assets['static_list.json'] = {
                source: () => {
                    return content;
                },
                size: () => {
                    return content.length;
                }
            }
            callback();
        })
    }
}

module.exports = StaticCountPlugin;