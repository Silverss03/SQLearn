const _ = require('lodash');
const { shareDependencies } = require('../constants/dependencies.cjs');

const sharedInitCode = `function sharedInit() {\n${_.reduce(
  shareDependencies,
  (prev, key) => `${prev}import("${key}");\n`,
  ''
)}}`;

module.exports = function (source) {
  return source + sharedInitCode;
};
