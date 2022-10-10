import { rgb } from 'color'
import theme from '../../../../theme'

// NOTE: this overrides the Kotahi default theme!

const waxTheme = {
  ...theme,
  gridUnit: '4px',
  borderRadius: '0',
  borderWidth: '1px',
  borderStyle: 'solid',
  colorBackground: 'white',
  colorPrimary: '#525E76',
  colorSecondary: '#E7E7E7',
  colorFurniture: '#CCC',
  colorBorder: '#EBEBF0',
  colorBackgroundHue: '#F1F5FF',
  colorBackgroundTabs: '#e1ebff',
  colorCitation: '#ccc',
  colorAuthorName: 'blue',
  colorAuthorGroup: 'blue',
  colorArticleTitle: '#FF0340',
  colorJournalTitle: '#7B61FF',
  colorDoi: '#6CBA4E',
  colorVolume: 'orange',
  colorIssue: 'magenta',
  colorYear: '#D29435',
  colorFirstPage: 'lime',
  colorLastPage: '#7599F8',
<<<<<<< HEAD
<<<<<<< HEAD
  colorFunding: '#cccccccc',
  colorFundingSource: '#b48ee8',
  colorFundingStatement: '#dc7be5',
  colorAwardId: '#e57dba',
  colorKeyword: '#EFEFF9',
  colorGlossary: '#B8B8D2',
  colorFrontMatter: 'pink',
  colorAppendix: 'teal',
  colorAcknowledgements: 'palegreen',
  colorAbstract: 'red',
=======
  colorKeyword: '#ccc',
>>>>>>> 7e1eb1db (feat(ui): styling for keywords)
=======
  colorKeyword: 'rgb(239, 239, 249)',
  colorGlossary: 'rgb(184, 184, 210)',
>>>>>>> 294b266a (fix(ui): added styling for glossaries per henrik's design)
}

export default waxTheme
