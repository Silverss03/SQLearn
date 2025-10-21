const baseConfig = require('@sql/configs/src/webpack/webpack.config.cjs');

module.exports = (env, argv) => {
  const config =
    typeof baseConfig === 'function' ? baseConfig(env, argv) : baseConfig;

  // Find HtmlWebpackPlugin and inject VITE_GTM_ID
  const htmlPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
  );
  if (htmlPlugin) {
    htmlPlugin.userOptions.templateParameters = {
      ...htmlPlugin.userOptions.templateParameters,
      VITE_GTM_ID: process.env.VITE_GTM_ID || '',
    };
  }

  return config;
};
