#! /usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const appRoot = require('app-root-path');

const FILE_NAME = {
  DOTENV: '.env',
  DOTENV_TEMPLATE: '.env.template',
};
const REGEX = {
  // 参考: https://github.com/motdotla/dotenv/blob/master/lib/main.js#L9
  LINE: /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?(\S)? *(#.*)?(?:$|$)/gm,
};
const SYMBOL = {
  IMPORTANT: '!',
};

const templatePath = path.resolve(appRoot.path, FILE_NAME.DOTENV_TEMPLATE);
const dotenvPath = path.resolve(appRoot.path, FILE_NAME.DOTENV);

if (!fs.existsSync(dotenvPath)) {
  fs.writeFileSync(dotenvPath, '');
}
if (!fs.existsSync(templatePath)) {
  console.error(`${FILE_NAME.DOTENV_TEMPLATE} is not found.`);
  process.exit(1); // Exit the process with an error code
}

const shellEnv = process.env;
const localEnv = dotenv.parse(fs.readFileSync(dotenvPath));

const src = fs.readFileSync(templatePath);
const text = src.toString().replace(/\r\n?/gm, '\n');

const replacer = (_match, key, value, symbol, _comment) => {
  let val = value;
  if (shellEnv.hasOwnProperty(key)) {
    val = `'${shellEnv[key]}'`;
  } else if (localEnv.hasOwnProperty(key) && symbol !== SYMBOL.IMPORTANT) {
    val = `'${localEnv[key]}'`;
  }
  return `${key}=${val}`;
};
const replaced = text.replace(REGEX.LINE, replacer);
fs.writeFileSync(path.resolve(appRoot.path, FILE_NAME.DOTENV), replaced);
