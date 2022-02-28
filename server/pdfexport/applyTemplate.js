const nunjucks = require('nunjucks')
const template = require('./pdfTemplates/article')
const publicationMetadata = require('./pdfTemplates/publicationMetadata')
const articleMetadata = require('./pdfTemplates/articleMetadata')
const css = require('./pdfTemplates/styles')

// applyTemplate.js

// TODO:
// 1. Use actual .njk template rather than a string version of a template
// 2. Sort out all the different CSSes and make sure that they are being applied correctly
// 3. If there is a user template in /config/pdfTemplates, use that instead of the default one
// 4. If there is a user stylesheet in /config/pdfTemplates, append that to the default stylesheet

const applyTemplate = (articleData, includeCss) => {
  if (!articleData) {
    // Error handling: if there's no manuscript.meta.source, what should we return?
    return ''
  }

  const thisArticle = articleData
  thisArticle.publicationMetadata = publicationMetadata
  thisArticle.articleMetadata = articleMetadata(thisArticle)
  let renderedHtml = nunjucks.renderString(template, { article: thisArticle })

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
