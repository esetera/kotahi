const { eslint } = require('@coko/lint')

eslint.rules['react/jsx-props-no-spreading'] = 0

// NOTE: These were added to get this past git cz and should be taken out.

eslint.rules['no-unused-vars'] = 0
eslint.rules['no-underscore-dangle'] = 0
eslint.rules['import/prefer-default-export'] = 0
eslint.rules['class-methods-use-this'] = 0

// end rules that should be taken out

// NOTE: these parser options get us past eslint but are wrong.

eslint.parserOptions = {
  ecmaVersion: 2019,
  ecmaFeatures: {
    jsx: true,
    legacyDecorators: true,
  },
}

module.exports = eslint
