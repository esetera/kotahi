
import updateDocumentView from './updateDocumentView'
import getFilterContent from './getFilterContent'

/*
This function return nothing, as it directly manupulate the view.
*/

const fixAll = (selectedFilters, view) => {
    for(let filter of selectedFilters){
        const doc = getFilterContent(filter, view);
        let clonedDocumentContent = JSON.parse(JSON.stringify(doc));
        updateDocumentView(filter, clonedDocumentContent,view);
    }
}

export default fixAll;