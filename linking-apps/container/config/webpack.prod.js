const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/linking-apps/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/linking-apps/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/linking-apps/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/linking-apps/dashboard/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);