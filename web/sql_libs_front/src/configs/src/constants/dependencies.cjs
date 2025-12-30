const path = require('node:path');
const _ = require('lodash');

const commonDependencies = {
  '@axa-fr/react-oidc': {
    version: '^6.19.2',
    description: '認証認可周りの通信をするために使う',
    shared: true,
  },
  '@emotion/react': {
    version: '^11.11.0',
    description: 'MUI（Material-UI）をインストール時に必要なライブラリ',
    shared: true,
  },
  '@emotion/styled': {
    version: '^11.11.0',
    description: 'MUI（Material-UI）をインストール時に必要なライブラリ',
    shared: true,
  },
  '@hookform/resolvers': {
    version: '^3.1.0',
    description: 'zodをreact-hook-formと連携するためのライブラリ',
    shared: () => ['@hookform/resolvers', '@hookform/resolvers/zod'],
  },
  '@mui/icons-material': {
    version: '^5.11.16',
    description: 'MUIのアイコンを使うためのライブラリ',
    shared: false,
  },
  '@mui/material': {
    version: '^5.14.4',
    description: 'MUI（Material-UI）をインストール時に必要なライブラリ',
    shared: () => [
      '@mui/material',
      '@mui/material/utils',
    ],
  },
  '@mui/x-date-pickers': {
    version: '^6.8.0',
    description: 'MUIのdate-pickerコンポーネントを使うためのライブラリ',
    shared: () => ['@mui/x-date-pickers', '@mui/x-date-pickers/AdapterDateFns'],
  },

  axios: {
    version: '^1.4.0',
    description: 'API通信用',
    shared: true,
  },
  'date-fns': {
    version: '^2.30.0',
    description: '日時データを扱うライブラリ',
    shared: () => ['date-fns', 'date-fns/locale/ja'],
  },
  i18next: {
    version: '^22.5.0',
    description: '多言語対応',
    shared: true,
  },
  linkifyjs: {
    version: '^4.1.3',
    description: 'プレーンテキスト中のリンクを<a>タグに置き換える',
    shared: true,
  },
  'linkify-react': {
    version: '^4.1.3',
    description: 'Reactコンポーネント用のlinkifyjs',
    shared: true,
  },
  'lodash-es': {
    version: '^4.17.21',
    description: 'ユーティリティライブラリ',
    shared: true,
  },
  react: {
    version: '^18.2.0',
    description: 'React本体',
    shared: true,
  },
  'react-dom': {
    version: '^18.2.0',
    description: 'ReactのDOM用ライブラリ',
    shared: () => ['react-dom', 'react-dom/client'],
  },
  'react-helmet-async': {
    version: '^1.3.0',
    description: 'headの書き換えのために使う',
    shared: true,
  },
  'react-hook-form': {
    version: '^7.44.2',
    description: 'フォームライブラリ',
    shared: true,
  },
  'react-i18next': {
    version: '^12.3.1',
    description: '多言語対応',
    shared: true,
  },
  'react-router-dom': {
    version: '^6.11.2',
    description: '画面遷移関連のルーティングを担うライブラリ',
    shared: true,
  },
  uuid: {
    version: '^9.0.0',
    description: 'UUID作成用',
    shared: true,
  },
  zod: {
    version: '^3.21.4',
    description: 'バリデーションライブラリ',
    shared: true,
  },
};

const commonDevDependencies = {
  '@faker-js/faker': {
    version: '^8.0.2',
    description: 'テスト用のフェイクデータを生成するライブラリ',
    shared: false,
  },

  '@storybook/react': {
    version: '^7.0.18',
    description: 'StorybookでReactコンポーネントを表示するために使う',
    shared: false,
  },
  '@storybook/testing-library': {
    version: '^0.1.0',
    description: 'Storybookでインタラクションをシミュレートするために使う',
    shared: false,
  },
  '@testing-library/jest-dom': {
    version: '^5.16.5',
    description: 'DOM の状態をテストするカスタム jest マッチャー',
    shared: false,
  },
  '@testing-library/react': {
    version: '^14.0.0',
    description: 'React の DOM をテストするためのユーティリティライブラリ',
    shared: false,
  },
  '@testing-library/user-event': {
    version: '^14.4.3',
    description: 'インタラクションをテストするためのライブラリ',
    shared: false,
  },
  '@types/jest': {
    version: '^29.5.2',
    description: 'jestの型定義',
    shared: false,
  },
  '@types/linkifyjs': {
    version: '^2.1.7',
    description: 'linkifyjsの型定義',
    shared: false,
  },
  '@types/lodash-es': {
    version: '^4.17.7',
    description: 'lodash-esの型定義',
    shared: false,
  },
  '@types/node': {
    version: '^20.2.5',
    description: 'nodeの型定義',
    shared: false,
  },
  '@types/react': {
    version: '^18.2.7',
    description: 'reactの型定義',
    shared: false,
  },
  '@types/react-dom': {
    version: '^18.2.4',
    description: 'react-domの型定義',
    shared: false,
  },
  '@types/react-router-dom': {
    version: '^5.3.3',
    description: 'react-router-domの型定義',
    shared: false,
  },
  '@types/uuid': {
    version: '^9.0.2',
    description: 'uuidの型定義',
    shared: false,
  },
  eslint: {
    version: '^8.41.0',
    description: 'JavaScriptの静的解析ツール',
    shared: false,
  },
  husky: {
    version: '^8.0.3',
    description: 'GitのコマンドをHookするのに使う',
    shared: false,
  },
  jest: {
    version: '^29.5.0',
    description: 'テストフレームワーク',
    shared: false,
  },

  prettier: {
    version: '^2.8.8',
    description: 'コードフォーマッター',
    shared: false,
  },
  storybook: {
    version: '^7.0.18',
    description: 'コンポーネントのカタログ生成ライブラリ',
    shared: false,
  },
  stylelint: {
    version: '^15.11.0',
    description: 'scssファイルのコード解析ツール',
    shared: false,
  },
  textlint: {
    version: '^13.3.3',
    description: 'テキストファイルの静的解析ツール',
    shared: false,
  },
  typescript: {
    version: '^5.0.4',
    description: '言語',
    shared: false,
  },
  webpack: {
    version: '^5.89.0',
    description: 'バンドラー',
    shared: false,
  },
  yalc: {
    version: '^1.0.0-pre.53',
    description: ' yarn linkの代替ライブラリ',
    shared: false,
  },
};

const shareDependencies = _.reduce(
  { ...commonDependencies, ...commonDevDependencies },
  (prev, value, key) => {
    if (_.isBoolean(value.shared) && value.shared) {
      return [...prev, key];
    }
    if (_.isFunction(value.shared)) {
      return [...prev, ...value.shared(key)];
    }
    return prev;
  },
  []
);

module.exports = {
  commonDependencies,
  commonDevDependencies,
  shareDependencies,
};
