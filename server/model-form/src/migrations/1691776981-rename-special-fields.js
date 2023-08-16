/* eslint-disable no-param-reassign */
const { useTransaction, logger } = require('@coko/server')
const { chunk } = require('lodash')

// Paths are relative to the generated migrations folder
/* eslint-disable import/no-unresolved */
const Group = require('../server/model-group/src/group')
const Config = require('../server/config/src/config')
const Form = require('../server/model-form/src/form')
const Manuscript = require('../server/model-manuscript/src/manuscript')
const Review = require('../server/model-review/src/review')
/* eslint-enable import/no-unresolved */

const fieldNameMap = {
  'meta.title': 'submission.$title',
  'submission.title': 'submission.$title',
  'submission.description': 'submission.$title',
  'submission.articleDescription': 'submission.$title',
  'meta.abstract': 'submission.$abstract',
  'submission.abstract': 'submission.$abstract',
  'submission.citations': 'submission.references', // Not a "standard" field, but standardising nonetheless
  'submission.doiSuffix': 'submission.$doiSuffix',
  'submission.DOI': 'submission.$doi',
  'submission.doi': 'submission.$doi',
  'submission.articleURL': 'submission.$doi', // elife
  'submission.biorxivURL': 'submission.$sourceUri',
  'submission.link': 'submission.$sourceUri',
  'submission.url': 'submission.$sourceUri',
  'submission.uri': 'submission.$sourceUri',
  'submission.authors': 'submission.$authors',
  'submission.authorNames': 'submission.$authors',
  'submission.labels': 'submission.$customStatus',
  'submission.label': 'submission.$customStatus',
  'submission.editDate': 'submission.$editDate',
  verdict: '$verdict',
  // 'submission.articleURL': 'submission.$sourceUri', // NCRC, covered in special case below.
  // Other fields referred to throughout the code, but not standardised for now, include:
  // submission.links
  // submission.references
  // submission.volumeNumber
  // submission.issueNumber
  // submission.issueYear
  // submission.journal
  // submission.objectType
  // submission.articleId (elife)
  // submission.review1
  // submission.review1date
  // submission.review1creator
  // submission.review1suffix
  // submission.summary
  // submission.summarydate
  // submission.summarycreator
  // submission.summarysuffix
  // submission.topic
  // submission.topics
  // submission.Funding
  // submission.AuthorCorrespondence
  // submission.competingInterests
  // submission.dateReceived
  // submission.dateAccepted
  // submission.datePublished
  // submission.initialTopicsOnImport
  // doi
  // pmid (pubmed ID)
  // authors
}

const replaceFieldName = field => {
  return { ...field, name: fieldNameMap[field.name] || field.name }
}

const renameDataInManuscript = (manuscript, instanceName) => {
  const newMeta = {}
  const newSubmission = {}

  Object.entries(manuscript.meta).forEach(([key, value]) => {
    const newFieldName = fieldNameMap[`meta.${key}`]

    if (newFieldName) {
      if (!newFieldName.startsWith('submission.'))
        throw new Error(
          'This migration should only populate submission fields!',
        )
      const submissionName = newFieldName.split('submission.')[1]
      if (newSubmission[submissionName])
        throw new Error(
          `Data conflict! Two fields are both mapped to ${newFieldName}.`,
        )

      // Special data modifications for some fields
      if (submissionName === '$abstract' && Array.isArray(value))
        value = value.join(' ') // Correcting for bug #628, whereby some abstracts were imported as arrays of strings
      if (submissionName === '$doi' && value.startsWith('https://doi.org/'))
        [, value] = value.split('https://doi.org/')

      newSubmission[submissionName] = value
    } else {
      newMeta[key] = value
    }
  })

  Object.entries(manuscript.submission).forEach(([key, value]) => {
    let newFieldName = fieldNameMap[`submission.${key}`]
    if (instanceName === 'ncrc' && key === 'articleURL')
      newFieldName = 'submission.$sourceUri' // elife and ncrc archetypes use articleURL differently

    if (newFieldName) {
      if (!newFieldName.startsWith('submission.'))
        throw new Error(
          'This migration should only populate submission fields!',
        )
      const submissionName = newFieldName.split('submission.')[1]
      if (newSubmission[submissionName])
        throw new Error(
          `Data conflict! Two fields are both mapped to '${newFieldName}'.`,
        )
      newSubmission[submissionName] = value
    } else {
      if (newSubmission[key])
        throw new Error(
          `Data conflict! Mapped field 'submission.${key}' collides with existing field.`,
        )
      newSubmission[key] = value
    }
  })

  return {
    ...manuscript,
    meta: newMeta,
    submission: JSON.stringify(newSubmission),
  }
}

const renameDataInReview = (review, instanceName) => {
  const newJsonData = {}
  Object.entries(review.jsonData).forEach(([key, value]) => {
    const newFieldName = fieldNameMap[key]

    if (newFieldName) {
      if (newJsonData[newFieldName])
        throw new Error(
          `Data conflict! Two fields are both mapped to '${newFieldName}'.`,
        )
      newJsonData[newFieldName] = value
    } else {
      if (newJsonData[key])
        throw new Error(
          `Data conflict! Mapped field '${key}' collides with existing field.`,
        )
      newJsonData[key] = value
    }
  })
  return { ...review, jsonData: JSON.stringify(newJsonData) }
}

const renameDataInSomeManuscripts = async (
  someManuscripts,
  instanceName,
  trx,
) => {
  let updatedCount = 0

  await Promise.all(
    someManuscripts.map(async manuscript => {
      const revisedManuscript = renameDataInManuscript(manuscript, instanceName)
      await Manuscript.query(trx).patchAndFetchById(
        manuscript.id,
        revisedManuscript,
      )
      updatedCount += 1
    }),
  )

  return updatedCount
}

const renameDataInSomeReviews = async (someReviews, instanceName, trx) => {
  let updatedCount = 0

  await Promise.all(
    someReviews.map(async review => {
      const revisedReview = renameDataInReview(review, instanceName)
      await Review.query(trx).patchAndFetchById(review.id, revisedReview)
      updatedCount += 1
    }),
  )

  return updatedCount
}

exports.up = async knex => {
  // throw new Error('Not ready to migrate yet!') // TODO

  return useTransaction(async trx => {
    const groups = await Group.query(trx)

    await Promise.all(
      groups.map(async group => {
        const { id: groupId, name: groupName } = group

        const activeConfig = await Config.query().findOne({
          groupId,
          active: true,
        })

        const { instanceName } = activeConfig.formData

        let updatedFormsCount = 0
        const forms = await Form.query(trx).where({ groupId })
        logger.info(`Total forms in group ${groupName}: ${forms.length}`)

        await Promise.all(
          forms.map(async form => {
            form.structure.children = form.structure.children.map(field =>
              replaceFieldName(field, instanceName),
            )
            await Form.query(trx).patchAndFetchById(form.id, form)
            updatedFormsCount += 1
          }),
        ).then(res => {
          logger.info(`Updated ${updatedFormsCount} forms`)
        })

        let updatedManuscriptsCount = 0

        const manuscripts = await Manuscript.query(trx).where({ groupId })

        logger.info(
          `Total manuscripts in group ${groupName}: ${manuscripts.length}`,
        )

        // eslint-disable-next-line no-restricted-syntax
        for (const someManuscripts of chunk(manuscripts, 10)) {
          // eslint-disable-next-line no-await-in-loop
          updatedManuscriptsCount += await renameDataInSomeManuscripts(
            someManuscripts,
            instanceName,
            trx,
          )
        }

        logger.info(`Updated ${updatedManuscriptsCount} manuscripts`)

        let updatedReviewsCount = 0

        const reviews = await Manuscript.relatedQuery('reviews', trx).for(
          Manuscript.query().where({ groupId }),
        )

        logger.info(
          `Total reviews/decisions in group ${groupName}: ${reviews.length}`,
        )

        // eslint-disable-next-line no-restricted-syntax
        for (const someReviews of chunk(reviews, 10)) {
          // eslint-disable-next-line no-await-in-loop
          updatedReviewsCount += await renameDataInSomeReviews(
            someReviews,
            instanceName,
            trx,
          )
        }

        logger.info(`Updated ${updatedReviewsCount} reviews/decisions`)

        // TODO update config for things like manuscript table columns
      }),
    )
  })
}
