const _ = require('lodash');
const { shareDependencies } = require('../constants/dependencies.cjs');

const hostSharedConfig = _.reduce(
  shareDependencies,
  (prev, key) => ({
    ...prev,
    [key]: {
      singleton: true,
      requiredVersion: '*',
      version: '1.0.0',
    },
  }),
  {}
);

const remoteSharedConfig = _.reduce(
  shareDependencies,
  (prev, key) => ({
    ...prev,
    [key]: {
      import: false,
      singleton: true,
      requiredVersion: '*',
      version: '0.0.0',
    },
  }),
  {}
);

module.exports = {
  hostSharedConfig,
  remoteSharedConfig,
};
