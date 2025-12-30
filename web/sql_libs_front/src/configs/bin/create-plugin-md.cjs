#! /usr/bin/env node

/**
 * TODO: textlintのルールとして作りたい
 */

const path = require('node:path');
const { promisify } = require('node:util');
const writeFileAsync = promisify(require('node:fs').writeFileSync);
const execAsync = promisify(require('node:child_process').exec);
const _ = require('lodash');
const { commonDependencies, commonDevDependencies } = require(
  path.join(__dirname, '../src/constants/dependencies.cjs')
);

async function getLatestVersion(key) {
  try {
    const { stdout } = await execAsync(`npm view ${key} version`);
    return stdout.trim();
  } catch (err) {
    console.error(err);
    return '';
  }
}

async function main() {
  let text = '';

  // CODEARTIFACT_AUTH_TOKENの確認
  try {
    await execAsync('npm ping');
  } catch {
    console.error('CODEARTIFACT_AUTH_TOKENを更新してください');
    return;
  }

  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // 共通npmパッケージ
  text += `## 共通npmパッケージ\n\n`;
  text += `| フレームワーク、プラグイン名 | 最新Ver(${today}時点) | 現在のバージョン指定 | 備考 | npm page |\n`;
  text += `|:--:|:--:|:--:|:--:|:--:|\n`;
  const npmPackages = _.pickBy(
    { ...commonDependencies, ...commonDevDependencies },
    (value, key) => !_.startsWith(key, '@mp')
  );
  const npmPromises = _.map(npmPackages, async (value, key) => {
    const latest = await getLatestVersion(key);
    return `| ${key} | ${latest} | ${value.version ?? ''} | ${
      value.description ?? ''
    } | https://www.npmjs.com/package/${key} |\n`;
  });
  const npmRows = await Promise.all(npmPromises);
  text += _.join(npmRows, '');

  // 共通mpパッケージ
  text += `\n`;
  text += `## 共通mpパッケージ\n\n`;
  text += `| フレームワーク、プラグイン名 | 最新Ver(${today}時点) | 現在のバージョン指定 | 備考 | npm page |\n`;
  text += `|:--:|:--:|:--:|:--:|:--:|\n`;
  const mpPackages = _.pickBy(
    { ...commonDependencies, ...commonDevDependencies },
    (value, key) => _.startsWith(key, '@mp')
  );
  const mpPromises = _.map(mpPackages, async (value, key) => {
    const latest = await getLatestVersion(key);
    return `| ${key} | ${latest} | ${value.version ?? ''} | ${
      value.description ?? ''
    } | |\n`;
  });
  const mpRows = await Promise.all(mpPromises);
  text += _.join(mpRows, '');

  writeFileAsync(path.join(__dirname, '../README_PLUGIN.md'), text);
}

main();
