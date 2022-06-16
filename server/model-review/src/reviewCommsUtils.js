const models = require('@pubsweet/models')

const getReviewForm = async isDecision => {
  const form = await models.Form.query().where({
    category: isDecision ? 'decision' : 'review',
    purpose: isDecision ? 'decision' : 'review',
  })

  if (!form || !form.length)
    throw new Error(`No form found for "${isDecision ? 'decision' : 'review'}"`)
  return form[0]
}

module.exports = { getReviewForm }
