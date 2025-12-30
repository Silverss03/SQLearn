const { execSync } = require('child_process');

function yarn(script) {
  execSync(`yarn ${script}`, { stdio: 'inherit', cwd: __dirname });
}

module.exports = {
  '*': () => {
    yarn('tsc');
    yarn('prettier');
    yarn('eslint');
    return [];
  },
};
