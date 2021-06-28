const {
    override,
    // addBabelPlugin,
    // getBabelLoader,
    // addWebpackPlugin,
    // addWebpackModuleRule,
    disableEsLint,
} = require("customize-cra");

module.exports = (config, env) => {
    const prod = config.mode === "production";
    return override(
        disableEsLint()
    )(config, env);
};