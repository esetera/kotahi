/* eslint-disable no-param-reassign, no-restricted-syntax, no-await-in-loop, import/no-unresolved */
const { useTransaction, logger } = require('@coko/server')
const { chunk, get, set } = require('lodash')

// Paths are relative to the generated migrations folder
const Group = require('../server/model-group/src/group')
const Config = require('../server/config/src/config')
const Form = require('../server/model-form/src/form')
const Manuscript = require('../server/model-manuscript/src/manuscript')
const Review = require('../server/model-review/src/review')

const getNewFieldName = (fieldName, instanceType) => {
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
    'submission.articleURL': 'submission.$sourceUri', // Caution! elife uses this for DOI. We handle this with a special case below.
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

  if (instanceType === 'elife' && fieldName === 'submission.articleURL')
    return 'submission.$doi'
  return fieldNameMap[fieldName] || fieldName
}

const replaceFieldName = (field, instanceType) => {
  return {
    ...field,
    name: getNewFieldName(field.name, instanceType) || field.name,
  }
}

const tweakDataValueByField = (value, fieldName) => {
  if (fieldName === 'submission.$abstract' && Array.isArray(value))
    return value.join(' ') // Correcting for bug #628, whereby some abstracts were imported as arrays of strings
  if (fieldName === 'submission.$doi' && value.startsWith('https://doi.org/'))
    return value.split('https://doi.org/')[1]
  return value
}

const renameDataInManuscript = (manuscript, instanceType) => {
  const delta = {}

  const fieldEntries = Object.entries(manuscript.meta)
    .map(([key, value]) => [`meta.${key}`, value])
    .concat(
      Object.entries(manuscript.submission).map(([key, value]) => [
        `submission.${key}`,
        value,
      ]),
    )

  fieldEntries.forEach(([key, value]) => {
    const newFieldName = getNewFieldName(key, instanceType)
    const newValue = tweakDataValueByField(value, newFieldName)

    // Test for data collisions. We could have messy data if fields have been
    // renamed at some point, or if bulk imports are populating the wrong fields.
    if (get(delta, newFieldName)) {
      if (!newValue) return // continue, rather than overwrite wth blank data
      if (newValue === get(delta, newFieldName)) return // continue: because the two fields have the same data anyway
      throw new Error(`Data conflict! Two fields mapped to ${newFieldName}.`)
    }

    set(delta, newFieldName, newValue)
  })

  return {
    ...manuscript,
    meta: delta.meta,
    submission: JSON.stringify(delta.submission),
  }
}

const renameDataInReview = (review, instanceType) => {
  const newJsonData = {}
  Object.entries(review.jsonData).forEach(([key, value]) => {
    const newFieldName = getNewFieldName(key, instanceType)

    if (newJsonData[newFieldName]) {
      if (!value) return // continue, rather than overwrite with blank data
      throw new Error(`Data conflict! Two fields mapped to '${newFieldName}'.`)
    }

    newJsonData[newFieldName] = value
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

const updateConfig = async (config, instanceType, trx) => {
  let newColumns = config.formData.manuscript.tableColumns
    .split(',')
    .map(c => c.trim())
    .map(c => getNewFieldName(c, instanceType))

  // Turn submission.$title into titleAndAbstract unless the abstract is already displayed in its own column.
  // 'titleAndAbstract' is a special built-in column type that links the title to submission.$sourceUri if
  // available, and shows the submission.$abstract as a tooltip if available.
  if (!newColumns.includes('submission.$abstract')) {
    newColumns = newColumns.map(c => {
      if (c === 'submission.$title') return 'titleAndAbstract'
      return c
    })
  }

  await Config.query(trx).patchAndFetchById(config.id, {
    formData: {
      ...config.formData,
      manuscript: {
        ...config.formData.manuscript,
        tableColumns: newColumns.join(','),
      },
    },
  })
}

exports.up = async knex => {
  // throw new Error('Not ready to migrate yet!') // TODO

  return useTransaction(async trx => {
    const groups = await Group.query(trx)

    await Promise.all(
      groups.map(async group => {
        const { id: groupId, name: groupName } = group
        const configs = await Config.query(trx).where({ groupId })
        const activeConfig = configs.find(x => x.active)
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

        for (const someManuscripts of chunk(manuscripts, 10)) {
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

        for (const someReviews of chunk(reviews, 10)) {
          updatedReviewsCount += await renameDataInSomeReviews(
            someReviews,
            instanceName,
            trx,
          )
        }

        logger.info(`Updated ${updatedReviewsCount} reviews/decisions`)

        logger.info(`Total configs in group ${groupName}: ${configs.length}`)
        for (const config of configs)
          await updateConfig(config, instanceName, trx)
        logger.info(`Updated ${configs.length} configs`)

        // TODO update config for things like manuscript table columns
      }),
    )
  })
}