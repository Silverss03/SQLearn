module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'jest.config.cjs'],
  plugins: ['jest', 'jest-dom', 'testing-library'],
  rules: {},
  overrides: [
    {
      files: ['**/*'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      files: ['**/*'],
      rules: {
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['**/*'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['**/*'],
      rules: {
        'import/no-default-export': 'error',
      },
    },
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
      ],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
    },
    {
      files: ['**/*'],
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
          },
        ],
      },
    },
    {
      files: ['**/*'],
      rules: {
        'no-void': ['error', { allowAsStatement: true }],
      },
    },
    {
      files: ['**/*'],
      rules: {
        'eslint-comments/require-description': ['error'],
      },
    },
    {
      files: ['**/*'],
      rules: {
        'max-lines-per-function': ['error', 300],
      },
    },
  ],
};
