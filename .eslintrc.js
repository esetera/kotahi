const { eslint } = require('@coko/lint')

// Added parserOptions to remove the @decorators issues
eslint.parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    legacyDecorators: true,
    experimentalObjectRestSpread: true,
  },
}
// Added rules to avoid class method
eslint.rules['class-methods-use-this'] = [
  1,
  { exceptMethods: ['run', 'enable', 'active', 'select'] },
]

eslint.rules['react/jsx-props-no-spreading'] = 0

module.exports = eslint
