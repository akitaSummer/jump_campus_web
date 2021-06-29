const {
    override,
    // addBabelPlugin,
    // getBabelLoader,
    // addWebpackPlugin,
    // addWebpackModuleRule,
    disableEsLint,
    overrideDevServer
} = require("customize-cra");

const devServerConfig = () => config => {
    return {
        ...config,
        port: 3000,
        proxy: {
            '/rec': {
                target: 'https://doudou0.online/',
                changeOrigin: true,
            },
        },
    }
}

module.exports = {
    webpack: override(
        disableEsLint()
    ),
    devServer: overrideDevServer(
        // dev server plugin
        devServerConfig()
    )
}