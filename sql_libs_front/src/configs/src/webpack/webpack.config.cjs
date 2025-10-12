require('dotenv').config();
const path = require('path');
const _ = require('lodash');
const appRoot = require('app-root-path');
const packageJson = require(appRoot + '/package.json');
const {
  container: { ModuleFederationPlugin },
  ProgressPlugin,
  DefinePlugin,
} = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { hostSharedConfig, remoteSharedConfig } = require('./sharedConfig.cjs');

const configs = {
  'sql-shell': {
    name: 'sqlShell',
    version: packageJson.version ?? '',
    port: 5300,
    isHost: true,
    exposes: null,
  },
  'sql-kernel': {
    name: 'kernel',
    version: packageJson.version ?? '',
    port: 5200,
    isHost: false,
    exposes: packageJson.exports ?? [],
  },
  'sql-biz01': {
    name: 'sqlBiz01',
    version: packageJson.version ?? '',
    port: 5201,
    isHost: false,
    exposes: packageJson.exports ?? [],
  },
};

const browserslist = [
  'last 2 chrome version',
  'last 2 edge version',
  'last 2 safari version',
  'iOS >= 16',
];

module.exports = (_env, argv) => {
  const config = configs[packageJson.name];

  if (_.isEmpty(config)) {
    throw new Error('Invalid Package Name.');
  }

  const mode = argv.mode ?? 'development';
  const isDev = mode === 'development';
  const isAnalyze = process.env.ANALYZE === 'true';
  const viteEnv = _.pickBy(process.env, (_value, key) =>
    _.startsWith(key, 'VITE_')
  );

  const webpackConfig = {
    mode,
    entry: './src/index.ts',
    devtool: isDev ? 'source-map' : false,
    stats: 'minimal',
    output: {
      path: path.resolve(appRoot.path, 'dist'),
      publicPath: config.isHost ? '/' : 'auto',
      filename: 'assets/[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
              },
              env: {
                targets: browserslist,
              },
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'autoprefixer',
                      {
                        overrideBrowserslist: browserslist,
                      },
                    ],
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: 'expanded',
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
        },
        ...(config.isHost
          ? [
            {
              test: /main.tsx$/,
              use: path.resolve(__dirname, 'inject.loader.cjs'),
            },
          ]
          : []),
      ],
    },
    plugins: [
      ...(config.isHost
        ? [
          new ModuleFederationPlugin({
            name: config.name,
            remotes: {
              kernel: `kernel@${process.env.VITE_REMOTE_APP_KERNEL}`,
              sqlBiz01: `sqlBiz01@${process.env.VITE_REMOTE_APP_MP_BIZ01}`,
            },
            shared: hostSharedConfig,
          }),
        ]
        : []),
      ...(!config.isHost
        ? [
          new ModuleFederationPlugin({
            name: config.name,
            library: { type: 'var', name: config.name },
            filename: 'assets/remoteEntry.js',
            exposes: config.exposes,
            shared: remoteSharedConfig,
          }),
        ]
        : []),
      new DefinePlugin({
        ..._.reduce(
          {
            VERSION: config.version,
            MODE: mode,
            ...viteEnv,
          },
          (prev, value, key) => ({
            [`import.meta.env.${key}`]: JSON.stringify(value),
            ...prev,
          }),
          {}
        ),
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      }),
      ...(config.isHost
        ? [
          new HtmlWebpackPlugin({
            template: path.resolve(appRoot.path, 'index.html'),
            templateParameters: {
              ...viteEnv,
            },
          }),
        ]
        : []),
      new ProgressPlugin(),
      new CopyPlugin({
        patterns: [{ from: 'public' }],
      }),
      ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      symlinks: false,
      alias: {
        'roughjs/bin/rough': 'roughjs/bundled/rough.cjs.js',
        'roughjs/bin/math': 'roughjs/bundled/rough.cjs.js',
        'roughjs/bin/generator': 'roughjs/bundled/rough.cjs.js',
        react: path.resolve(appRoot.path, 'node_modules/react'),
        'react-dom': path.resolve(appRoot.path, 'node_modules/react-dom'),
      },
    },
    target: 'web',
    devServer: {
      static: false,
      historyApiFallback: true,
      port: config.port,
      watchFiles: {
        paths: ['**/*'],
        options: {
          ignored: ['**/node_modules'],
        },
      },
      client: {
        overlay: false,
      },
    },
    performance: isAnalyze
      ? {
        hints: 'warning',
      }
      : {
        hints: false,
      },
  };

  return webpackConfig;
};
