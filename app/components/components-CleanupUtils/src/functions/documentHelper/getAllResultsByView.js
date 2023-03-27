import preEditingMatches  from './preEditingMatches';
import { each } from "lodash";

const getAllResultsByView = (
    view,
    searchValue,
    matchCaseSearch,
    expression,
    customExpression,
    tag
  ) => {
    const allResults = {};
    each(view, (singleView, viewId) => {
      if (!allResults[viewId]) {
        allResults[viewId] = preEditingMatches(
          singleView.state.doc,
          searchValue,
          matchCaseSearch,
          expression,
          tag
        );
      }
    });
    return allResults;
  };

  export default getAllResultsByView