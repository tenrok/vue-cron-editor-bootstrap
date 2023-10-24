const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
  rules: {
    curly: 'warn',
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
