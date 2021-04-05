const { merge } = require('webpack-merge');
const common = require('./webpack.dev');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
});
