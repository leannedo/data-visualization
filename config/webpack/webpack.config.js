const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (env) => {
  const envConfig = require(`./webpack.${env.NODE_ENV}.js`);

  return merge(commonConfig, envConfig);
};
