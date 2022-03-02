const path = require('path')
const nunjucks = require('nunjucks')
const publicationMetadata = require('./pdfTemplates/publicationMetadata')
const articleMetadata = require('./pdfTemplates/articleMetadata')
const css = require('./pdfTemplates/styles')

// applyTemplate.js

// TODO:
// 2. Sort out all the different CSSes and make sure that they are being applied correctly
// 4. If there is a user stylesheet in /config/pdfTemplates, append that to the default stylesheet

const defaultTemplatePath = path.resolve(__dirname, 'pdfTemplates')

const userTemplatePath = path.resolve(
  __dirname,
  '../../../../../../config/export',
)

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

const applyTemplate = (articleData, includeCss) => {
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
      `<style>${css}</style></body>`,
    )
  }

  // TODO: why is this coming out over GraphQL with escaped newlines?

  renderedHtml = renderedHtml.replace(/\n|\r|\t/g, '')

  return renderedHtml
}

module.exports = applyTemplate
