/* eslint-disable */
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: { "@primary-color": "#FBCEB1" },

  lessVarsFilePath: "./src/styles/variables.less",
  // cssLoaderOptions: {
  //   esModule: false,
  //   sourceMap: false,
  //   modules: {
  //     mode: 'local',
  //   },
  // },

  // Other NextConfig Here...
  webpack(config) {
    return config;
  },
});
