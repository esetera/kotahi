const fs = require('fs')
const citeproc = require('citeproc-js-node')
const path = require('path')

// eslint-disable-next-line new-cap
const sys = new citeproc.simpleSys()

// Wherever your locale and style files are. None are included with the package.
const enUS = fs.readFileSync(
  path.join(__dirname, '/csl-locales/locales-en-US.xml'),
  'utf8',
)

sys.addLocale('en-US', enUS)

const styleString = fs.readFileSync(
  path.join(__dirname, '/csl/apa.csl'),
  'utf8',
)

const engine = sys.newEngine(styleString, 'en-US', null)

const items = {
  '14058/RN9M5BF3': {
    accessed: { month: '9', year: '2010', day: '10' },
    id: '14058/RN9M5BF3',
    author: [
      { given: 'Adel', family: 'Hendaoui' },
      { given: 'Moez', family: 'Limayem' },
      { given: 'Craig W.', family: 'Thompson' },
    ],
    title: '3D Social Virtual Worlds: <i>Research Issues and Challenges</i>',
    type: 'article-journal',
    versionNumber: 6816,
  },
  '14058/NSBERGDK': {
    accessed: { month: '9', year: '2010', day: '10' },
    issued: { month: '6', year: '2009' },
    'event-place': 'Istanbul',
    type: 'paper-conference',
    DOI: '10.1109/DEST.2009.5276761',
    'page-first': '151',
    id: '14058/NSBERGDK',
    'title-short':
      '3D virtual worlds as collaborative communities enriching human endeavours',
    'publisher-place': 'Istanbul',
    author: [
      { given: 'C.', family: 'Dreher' },
      { given: 'T.', family: 'Reiners' },
      { given: 'N.', family: 'Dreher' },
      { given: 'H.', family: 'Dreher' },
    ],
    title:
      '3D virtual worlds as collaborative communities enriching human endeavours: Innovative applications in e-Learning',
    shortTitle:
      '3D virtual worlds as collaborative communities enriching human endeavours',
    page: '151-156',
    event:
      '2009 3rd IEEE International Conference on Digital Ecosystems and Technologies (DEST)',
    URL:
      'http://ieeexplore.ieee.org/lpdocs/epic03/wrapper.htm?arnumber=5276761',
    versionNumber: 1,
  },
}

// sys.items = items

// engine.updateItems(Object.keys(items))
// const bib = engine.makeBibliography()
// console.log(bib)

const formatReference = async stringifiedCSL => {
  // This takes stringified CSL and returns JATS-flavored HTML as a string
  let error = ''
  let referenceCSL = {}
  let result = ''

  try {
    console.log('Formatting reference: ', stringifiedCSL)
    referenceCSL = JSON.parse(stringifiedCSL)

    sys.items = [referenceCSL]

    engine.updateItems(Object.keys(items))
    const bib = engine.makeBibliography()
    console.log(bib)

    if (bib.length > 1) {
      const results = bib[1]
      // TODO: This is CSL-flavored HTML, need to make it JATS-flavored
      result = results[0]
    }
  } catch (e) {
    error = e.message
  }

  return { result, error }
}

module.exports = {
  formatReference,
}
