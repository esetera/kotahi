import { eachRight } from 'lodash'

const replaceAll = (view, results) => {
  const {
    state: { tr },
  } = view

  eachRight(results, range => {
    const { to, from, replace } = range
    tr.insertText(replace, from, to)
  })
  view.dispatch(tr)
}

export default replaceAll
