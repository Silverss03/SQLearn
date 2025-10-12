#! /usr/bin/env node

/**
 * 親プロセスに対するSIGINTを防止し、ctrl+cが来たら子プロセスにSIGINTを2回送信して強制終了するスクリプト
 * ex) wait-child webpack serve --development
 * https://github.com/yarnpkg/yarn/issues/4667
 * https://github.com/webpack/webpack-dev-server/issues/1479
 */

const { exit } = require('process');
const { spawn } = require('child_process');
const readline = require('readline');

const childProcess = spawn(process.argv[2], process.argv.splice(3), {
  cwd: process.cwd(),
  stdio: ['ignore', 'inherit', 'inherit'],
});

childProcess.on('close', () => {
  exit(0);
});

function cleanupHandler() {
  childProcess.kill('SIGINT');
  childProcess.kill('SIGINT');
}

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (char, key) => {
  if (key.ctrl && key.name === 'c') {
    cleanupHandler();
  }
});
