const path = require('node:path');
const { promisify } = require('node:util');
const execAsync = promisify(require('node:child_process').exec);
const { forEach, has, keys, includes, map } = require('lodash');
const {
  commonDependencies,
  commonDevDependencies,
} = require('../../constants/dependencies.cjs');

const scripts = {
  dev: 'yarn-run webpack serve --mode=development',
  prod: 'yarn-run webpack serve --mode=production',
  'dev-build': 'tsc && webpack --mode=development',
  'prod-build': 'tsc && webpack --mode=production',
  'dev-build-watch': 'webpack -w --mode=development',
  analyze: 'ANALYZE=true yarn prod-build',
  prettier: 'prettier --write . --ignore-path .gitignore --loglevel warn',
  eslint:
    "eslint '**/*.{js,ts,jsx,tsx}' --rulesdir node_modules/@sql/configs/src/eslint/rules --ignore-path .gitignore",
  test: 'jest --config ./jest.config.cjs',
  coverage: 'jest --config ./jest.config.cjs --coverage',
  postinstall: 'create-env',
  textlint:
    "unset $(env | awk -F= '$1 ~ /^npm_/ {print $1}') && textlint * --rulesdir node_modules/@sql/configs/src/textlint/rules --ignore-path .gitignore",
  stylelint: 'stylelint **/*.scss',
};

async function getVersion(value, key) {
  if (value.version === 'latest') {
    const { stdout } = await execAsync(`npm view ${key} version`);
    return stdout.trim();
  }
  return value.version;
}

module.exports = function (context, options) {
  const { Syntax, getFilePath } = context;
  const fileName = path.basename(getFilePath());

  const printFilePath = () => {
    console.log(`${getFilePath()}`);
  };

  const reportError = ({ node, message }) => {
    // Use \x1B for the ASCII escape character (0x1B is hexadecimal for 27, which is the ASCII escape character)
    const template = '\x1B[31m  error  \x1B[0m' + message;
    console.error(template);
  };

  const reportWarn = ({ node, message }) => {
    // Use \x1B for the ASCII escape character (0x1B is hexadecimal for 27, which is the ASCII escape character)
    const template = '\x1B[33m  warn   \x1B[0m' + message;
    console.error(template);
  };

  return {
    async [Syntax.Document](node) {
      if (fileName !== 'package.json') {
        return;
      }
      const json = JSON.parse(node.raw);
      printFilePath();

      // CODEARTIFACT_AUTH_TOKENの確認
      try {
        await execAsync('npm ping');
      } catch {
        reportError({
          node,
          message: 'CODEARTIFACT_AUTH_TOKEN has expired',
        });
        return process.exit(1);
      }

      // scriptsチェック
      let scriptsErrorCount = 0;
      forEach(scripts, (value, key) => {
        if (!has(json.scripts, key)) {
          scriptsErrorCount += 1;
          return reportWarn({
            node,
            message: `Add "${key}": "${value}" to scripts`,
          });
        }
        if (json.scripts[key] !== value) {
          scriptsErrorCount += 1;
          return reportWarn({
            node,
            message: `Update "${key}" to "${value}" in scripts`,
          });
        }
      });
      if (scriptsErrorCount > 0) {
        return;
      }

      // dependenciesチェック
      await Promise.all(
        map(commonDependencies, async (value, key) => {
          const version = await getVersion(value, key);
          if (!has(json.dependencies, key)) {
            return reportWarn({
              node,
              message: `Add "${key}": "${version}" to dependencies`,
            });
          }
          if (json.dependencies[key] !== version) {
            return reportWarn({
              node,
              message: `Update "${key}": "${json.dependencies[key]}" to "${key}": "${version}" in dependencies`,
            });
          }
        })
      );
      await Promise.all(
        map(commonDevDependencies, async (value, key) => {
          const version = await getVersion(value, key);
          if (!has(json.devDependencies, key)) {
            return reportWarn({
              node,
              message: `Add "${key}": "${version}" to devDependencies`,
            });
          }
          if (json.devDependencies[key] !== version) {
            return reportWarn({
              node,
              message: `Update "${key}": "${json.devDependencies[key]}" to "${key}": "${version}" in devDependencies`,
            });
          }
        })
      );
      if (!has(json, 'uniqueDependencies')) {
        reportWarn({
          node,
          message: `Add "uniqueDependencies: []" to package.json`,
        });
      }
      forEach(keys(json.dependencies), (key) => {
        if (
          !has(commonDependencies, key) &&
          !includes(json.uniqueDependencies ?? [], key)
        ) {
          return reportWarn({
            node,
            message: `Add "${key}" to uniqueDependencies`,
          });
        }
      });
      forEach(keys(json.devDependencies), (key) => {
        if (
          !has(commonDevDependencies, key) &&
          !includes(json.uniqueDependencies ?? [], key)
        ) {
          return reportWarn({
            node,
            message: `Add "${key}" to uniqueDependencies`,
          });
        }
      });
      forEach(json.uniqueDependencies ?? [], (key) => {
        if (has(commonDependencies, key) || has(commonDevDependencies, key)) {
          return reportWarn({
            node,
            message: `Remove "${key}" from uniqueDependencies`,
          });
        }
      });
    },
  };
};
