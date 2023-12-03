module.exports = {
  extends: [
    // 'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // 'plugin:node/recommended-module',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'plugin:eslint-comments/recommended',
    // 'plugin:array-func/recommended',
    // 'plugin:unicorn/recommended',
    // 'plugin:no-use-extend-native/recommended',
    // 'plugin:promise/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
  },
};
