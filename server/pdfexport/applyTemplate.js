const path = require('path')
const fs = require('fs-extra').promises
const nunjucks = require('nunjucks')
const publicationMetadata = require('./pdfTemplates/publicationMetadata')
const articleMetadata = require('./pdfTemplates/articleMetadata')

// applyTemplate.js

// TODO:
// 2. Sort out all the different CSSes and make sure that they are being applied correctly
// 4. If there is a user stylesheet in /config/pdfTemplates, append that to the default stylesheet

const defaultTemplatePath = path.resolve(__dirname, 'pdfTemplates')

const userTemplatePath = path.resolve(
  __dirname,
  '../../../../../../config/export',
)

const generateCSS = async () => {
  let outputCss = ''

  const defaultCssBuffer = await fs.readFile(
    `${defaultTemplatePath}/styles.css`,
  )

  outputCss = defaultCssBuffer.toString()

  try {
    const userCssBuffer = await fs.readFile(`${userTemplatePath}/styles.css`)
    outputCss += userCssBuffer.toString()
  } catch (e) {
    console.error('No user stylesheet found', e)
  }

  return outputCss
}

const defaultTemplateEnv = nunjucks.configure(defaultTemplatePath, {
  autoescape: true,
  cache: false,
})

const userTemplateEnv = nunjucks.configure(userTemplatePath, {
  autoescape: true,
  cache: false,
})

let template = {}

try {
  // If there is a user template, use that instead
  template = userTemplateEnv.getTemplate('article.njk')
} catch (e) {
  template = defaultTemplateEnv.getTemplate('article.njk')
}

const applyTemplate = async (articleData, includeCss) => {
  const theCss = await generateCSS()

  if (!articleData) {
    // Error handling: if there's no manuscript.meta.source, what should we return?
    return ''
  }

  const thisArticle = articleData
  thisArticle.publicationMetadata = publicationMetadata
  thisArticle.articleMetadata = articleMetadata(thisArticle)
  let renderedHtml = nunjucks.renderString(template, {
    article: thisArticle,
  })

  if (includeCss) {
    renderedHtml = renderedHtml.replace(
      '</body>',
      `<style>${theCss}</style></body>`,
    )
  }

  // TODO: why is this coming out over GraphQL with escaped newlines?

  renderedHtml = renderedHtml.replace(/\n|\r|\t/g, '')

  return renderedHtml
}

module.exports = { applyTemplate, generateCSS }
