const {
  convertFilesToIdsOnly,
  convertFilesToFullObjects,
} = require('../src/reviewUtils')

const getFilesByIds = ids =>
  ids.map(id => ({
    id,
    created: '2022-08-10T11:29:31.552Z',
    updated: '2022-08-10T11:29:31.552Z',
    name: id.substr(4),
    objectId: 'dc40b7de-1e19-4e56-8680-80bec9103b13',
  }))

const getFilesWithUrl = files =>
  files.map(file => {
    const result = { ...file }
    result.storedObjects = [
      {
        key: file.name,
        mimeType: 'image/jpeg',
        url: `http://x.co/blah/${file.name}.jpg`,
      },
    ]
    return result
  })

const reviewWithIdsOnly = {
  id: 'dc40b7de-1e19-4e56-8680-80bec9103b13',
  manuscriptId: 'c291d737-c7ff-4e8e-9632-fb3853d614dc',
  userId: 'fc39b909-f1f2-4859-aa79-d51bc41e47e8',
  user: { id: 'fc39b909-f1f2-4859-aa79-d51bc41e47e8', username: 'Bob' },
  isDecision: true,
  jsonData: {
    decision: 'Blah blah',
    verdict: 'revise',
    files: [
      '50cb0739-10cb-4aa1-b050-efbc5de3ac46',
      '2f8ec5fd-de22-4497-9967-7b665792fabf',
      '0deb947b-03eb-4817-be31-3d53b06160f8',
    ],
    confidentialFiles: [
      '9a52c500-5f5f-484c-8250-b07d0fe9a0bd',
      'df4d8d7e-8cba-477e-8ee5-85174f6cc434',
    ],
    vaFiles: [
      '5d21d403-d973-4b4b-9eaa-54f995610ac6',
      'bcef5697-4089-4c41-9e05-331263551bbe',
    ],
  },
}

const reviewWithFileObjects = JSON.parse(JSON.stringify(reviewWithIdsOnly))

reviewWithFileObjects.jsonData.files = getFilesWithUrl(
  getFilesByIds(reviewWithFileObjects.jsonData.files),
)
reviewWithFileObjects.jsonData.confidentialFiles = getFilesWithUrl(
  getFilesByIds(reviewWithFileObjects.jsonData.confidentialFiles),
)
reviewWithFileObjects.jsonData.vaFiles = getFilesWithUrl(
  getFilesByIds(reviewWithFileObjects.jsonData.vaFiles),
)

const form = {
  purpose: 'decision',
  category: 'decision',
  structure: {
    children: [
      { name: 'decision', component: 'TextField' },
      { name: 'verdict', component: 'RadioGroup' },
      { name: 'files', component: 'SupplementaryFiles' },
      { name: 'confidentialFiles', component: 'SupplementaryFiles' },
      { name: 'vaFiles', component: 'VisualAbstract' },
    ],
  },
}

describe('convertFilesToFullObjects', () => {
  test('convert', async () => {
    const review = JSON.parse(JSON.stringify(reviewWithIdsOnly))
    await convertFilesToFullObjects(
      review,
      form,
      getFilesByIds,
      getFilesWithUrl,
    )
    expect(review).toEqual(reviewWithFileObjects)
  })
})

describe('convertFilesToIdsOnly', () => {
  test('convert', () => {
    const review = JSON.parse(JSON.stringify(reviewWithFileObjects))
    convertFilesToIdsOnly(review, form)
    expect(review).toEqual(reviewWithIdsOnly)
  })
})
