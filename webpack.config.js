const {merge} = require('webpack-merge');
const common = require('./webpack.config.common.js');

let count = 0;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        port: 3000,
        clientLogLevel: 'debug',
        noInfo: true,
        host: '0.0.0.0',
        before: function (app) {
            app.use('/', function (req, res, next) {
                if (count === 0) {
                    console.log("Local:           " + req.protocol + '://' + req.get('host'));
                    require('dns').lookup(require('os').hostname(), function (err, add) {
                        console.log("On Your Network: " + req.protocol + '://' + add + ':3000');
                    })
                    count++;
                }
                next()
            });
        },
    }
});