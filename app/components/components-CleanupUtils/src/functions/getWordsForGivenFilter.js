import getFilterContent from './getFilterContent'
/*
Return set of words that matches Regex patterns that given as filters
*/
const getWordsForGivenFilter = (selectedFilters, view) => {
    const wordToProcess = selectedFilters.reduce((acc, filter) => {
        const value = getFilterContent(filter, view);
        return [...acc, value];
    }, []);
    return wordToProcess;

}

export default getWordsForGivenFilter