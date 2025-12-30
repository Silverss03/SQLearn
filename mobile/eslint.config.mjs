import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import jest from 'eslint-plugin-jest';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    {
        plugins: {
            react,
            'react-native': reactNative,
            'react-hooks': fixupPluginRules(reactHooks),
            '@typescript-eslint': typescriptEslint,
            'unused-imports': unusedImports,
            jest,
            pluginReact,
            tseslint,
            pluginJs,
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.browser,
                ...globals.node,
                alert: true,
                File: true,
                FileReader: true,
                document: true,
                Image: true,
                Worker: true,
                Blob: true,
                self: true,
                atob: true,
                window: true,
                screen: true,
                navigator: true,
                requestAnimationFrame: true,
                fetch: true,
                __DEV__: true,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    {
        rules: {
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'max-len': 0,
            'arrow-parens': [2, 'always'],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'react/jsx-no-bind': [
                1,
                {
                    ignoreDOMComponents: false,
                    ignoreRefs: true,
                    allowArrowFunctions: true,
                    allowFunctions: false,
                    allowBind: false,
                },
            ],

            'react/jsx-first-prop-new-line': 2,
            'react/jsx-boolean-value': 1,
            'react/jsx-closing-bracket-location': 1,

            'react/jsx-max-props-per-line': [
                1,
                {
                    maximum: 1,
                },
            ],

            'react/display-name': [0],
            'arrow-body-style': 'warn',

            'indent': [
                'error',
                4,
                {
                    CallExpression: {
                        arguments: 2,
                    },

                    FunctionDeclaration: {
                        body: 1,
                        parameters: 2,
                    },

                    FunctionExpression: {
                        body: 1,
                        parameters: 2,
                    },

                    MemberExpression: 2,
                    ObjectExpression: 1,
                    SwitchCase: 1,
                    ignoredNodes: ['ConditionalExpression'],
                    'ArrayExpression': 1,
                    'ImportDeclaration': 1
                },
            ],

            'no-use-before-define': [
                'error',
                {
                    variables: false,
                },
            ],

            'react/prop-types': [
                'error',
                {
                    ignore: ['navigation'],
                },
            ],

            'class-methods-use-this': 'off',
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': 'off',

            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                },
            ],

            'object-curly-newline': [
                'error',
                {
                    ImportDeclaration: {
                        multiline: true,
                        minProperties: 3,
                    },

                    ExportDeclaration: {
                        multiline: true,
                        minProperties: 3,
                    },
                },
            ],

            'import/extensions': 'off',
            'no-trailing-spaces': 'error',
            curly: ['error', 'multi-line'],

            'space-before-blocks': [
                'error',
                {
                    functions: 'always',
                    keywords: 'always',
                    classes: 'always',
                },
            ],

            'space-before-function-paren': [
                'error',
                {
                    asyncArrow: 'always',
                    anonymous: 'never',
                    named: 'never',
                },
            ],

            'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true, }],
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'comma-style': ['error', 'last'],
            'no-multi-spaces': 'error',
            'no-multi-str': 'error',

            'object-curly-spacing': ['error', 'always'],
            'brace-style': 'error',
            'keyword-spacing': 'error',
            'arrow-spacing': 'error',
            'space-infix-ops': 'error',
            'space-unary-ops': 'error',
            'no-empty-pattern': 'off',

            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    }
];
