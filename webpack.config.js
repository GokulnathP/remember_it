const {merge} = require('webpack-merge');
const common = require('./webpack.config.common.js');

let count = 0;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: './dist'
        },
        open: true,
        port: 3000,
        client: {
            logging: 'info'
        }
    }
});