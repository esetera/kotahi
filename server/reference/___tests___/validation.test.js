const {
  getMatchingReferencesFromCrossRef,
  getReferenceWithDoi,
} = require('../src/validation')

const crossRefEmail = 'test@gmail.com'

const referenceMatches =
  'Fitzpatrick AL, Kuller LH, Lopez OL, Diehr P, O’Meara ES, Longstreth WT Jr, Luchsinger JA (2009): Midlife and late-life obesity and the risk of dementia: cardiovascular health study. Arch Neurol 66: 336–342.'

const referenceNoMatches = '!!!!!!'

const sampleDOI = '10.1159/000345136'

const getRefWrapper = async ref => {
  let response = null

  try {
    response = await getMatchingReferencesFromCrossRef(ref, 3, crossRefEmail)
  } catch (error) {
    console.error('Response Error:', error.message)
  }

  return response
}

const getDOIWrapper = async doi => {
  let response = null

  try {
    response = await getReferenceWithDoi(doi, crossRefEmail)
  } catch (error) {
    console.error('Response Error:', error.message)
  }

  return response
}

const getTestValues = async () => {
  const response1 = await getRefWrapper(referenceMatches)
  const response2 = await getRefWrapper(referenceNoMatches)
  const response3 = await getDOIWrapper(sampleDOI)
  return { response1, response2, response3 }
}

describe('checkCrossRefValidation', () => {
  const { response1, response2, response3 } = getTestValues()
  test('valid references', () => {
    expect(response1?.length).toEqual(3)
  })
  test('invalid references', () => {
    expect(response2?.length).toEqual(0)
  })
  test('get reference from DOI', () => {
    expect(response3?.title).toEqual(
      'Adiposity and Cognitive Decline in the Cardiovascular Health Study',
    )
  })
})
