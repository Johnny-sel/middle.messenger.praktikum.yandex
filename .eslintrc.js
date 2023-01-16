module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'google'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 0,
    'max-len': ['error', 100],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
