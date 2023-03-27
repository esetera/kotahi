import { getAllResultsByView } from './documentHelper'
import { each } from 'lodash'

const getOtherNodes = (filterObj, view, tag) => {
  let otherNodes = [];
  let reg = RegExp(/[a-zA-Z0-9]'[a-zA-Z0-9]/gm);
  const { expression, customExpression, search, type } = filterObj;
  const results = getAllResultsByView(view, search, false, expression, customExpression, tag);
  each(results, (result, key) => {
    let filterred = [];
    if (type === 'apostraphe') {
      result.map(item => {
        if (reg.test(item.text))
          filterred.push(item)
      })
    }
    else {
      filterred = result;
    }
    filterred = filterred.map((range) => {
      return { ...range, ...filterObj };
    });

    otherNodes = [...otherNodes, ...filterred]
  });

  if (otherNodes.length < 1) {
    otherNodes.push(filterObj);
  }
  return otherNodes
}

export default getOtherNodes;