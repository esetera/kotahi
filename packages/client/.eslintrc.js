/* eslint-disable import/no-extraneous-dependencies */

const { eslint } = require('@coko/lint')

eslint.parserOptions = {
  parser: '@babel/eslint-parser',
  requireConfigFile: false,
  babelOptions: {
    presets: ['@babel/preset-react'],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      'babel-plugin-parameter-decorator',
    ],
  },
}

eslint.root = true

module.exports = eslint
