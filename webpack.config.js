const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (webpackConfigEnv) => {
  const orgName = "topcoder";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "micro-frontends-frame",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          env: webpackConfigEnv.config,
          orgName,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/reuse", to: "./" },
          { from: 'config/', to: './' }
        ],
      }),
    ],
  });
};
