const path = require('node:path');
const appRoot = require('app-root-path');
const pkg = require(path.resolve(appRoot.path, 'package.json'));

const selectorClassPattern = {
  'sql-shell': null,
  'sql-kernel': 'kernel-.+',
  'sql-biz01': 'biz01-.+',
};

module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': selectorClassPattern[pkg.name],
  },
};
