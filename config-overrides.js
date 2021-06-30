const {
    override,
    // addBabelPlugin,
    // getBabelLoader,
    // addWebpackPlugin,
    // addWebpackModuleRule,
    disableEsLint,
    setWebpackPublicPath,
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
    webpack: (config, env) => {
        const prod = config.mode === "production";
        return override(
            disableEsLint(),
            prod && setWebpackPublicPath('/school')
        )(config, env)
    },
    devServer: overrideDevServer(
        // dev server plugin
        devServerConfig()
    )
}