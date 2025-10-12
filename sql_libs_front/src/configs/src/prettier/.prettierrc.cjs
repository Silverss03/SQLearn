const importGroups = {
  react: '^react(.*)$',
  external: '<THIRD_PARTY_MODULES>',
  parent: '^[../]',
  child: '^[./]',
};

module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  importOrder: Object.values(importGroups),
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  overrides: [
    {
      files: '*.md',
      options: { requirePragma: true },
    },
    {
      files: '**/generated/**/*',
      options: { requirePragma: true },
    },
  ],
};
