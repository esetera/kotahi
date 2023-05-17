import updateDocumentView from './updateDocumentView'
import getFilterContent from './getFilterContent'

/*
This function return nothing, as it directly manupulate the view.
*/

const fixAll = (selectedFilters, view) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const filter of selectedFilters) {
    const doc = getFilterContent(filter, view)
    const clonedDocumentContent = JSON.parse(JSON.stringify(doc))
    updateDocumentView(filter, clonedDocumentContent, view)
  }
}

export default fixAll
