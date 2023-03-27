import {
  remove,
  clearViewSelection,
  removeMarkFromNode,
  insertPara,
  removeMultipleBreak,
  onLocate,
  replace,
} from './documentHelper'

/*
This function return nothing, as it directly manupulate the view.
*/

const fix = (view, content, viewId) => {
  const singleView = view.main
  if (content.replaceType === 'remove') {
    if (content.ruleType === 'underline' || content.ruleType === 'link') {
        removeMarkFromNode(
            view.main,
            content,
            view.main.state.schema.marks[content.ruleType],
          )
    } else {
        remove(singleView, content)
     
    }
  } else {
    if (content.search === 'invisible--break') {
      onLocate(view, viewId, content)
      insertPara(singleView, content)
    } else if (content.text === 'HardBreak') {
      removeMultipleBreak(singleView, content)
    } else if ((content.type = 'emdash')) {
      content.from = content.from
      replace(singleView, content)
    } else if ((content.type = 'replace')) {
      replace(singleView, content)
    } else {
      replace(singleView, content)
    }
    removeMarkFromNode(
      view.main,
      content,
      view.main.state.schema.marks[content.ruleType],
    )
  }
  clearViewSelection(view, 'main')
}

export default fix
