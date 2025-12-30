const _ = require('lodash');
const {
  commonDependencies,
  commonDevDependencies,
} = require('../../constants/dependencies.cjs');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '',
    },
    fixable: 'code',
  },
  create: function (context) {
    return {
      ImportDeclaration: function check(node) {
        const importKind = _.get(node, 'importKind', '');
        if (importKind === 'type') {
          return;
        }
        const target = _.get(node, 'source.value', '');
        const isWrongKey = _.some(
          { ...commonDependencies, ...commonDevDependencies },
          ({ shared }, key) => {
            if (shared === false) {
              return false;
            }
            if (target === key || _.startsWith(target, `${key}/`)) {
              if (shared === true && target === key) {
                return false;
              }
              if (_.isFunction(shared) && _.includes(shared(), target)) {
                return false;
              }
              return true;
            } else {
              return false;
            }
          }
        );
        if (isWrongKey) {
          context.report({
            node: node,
            message: `${target} is not shared key`,
          });
        }
      },
    };
  },
};
