import { eachRight } from 'lodash'

const removeAll = (view, results) => {
  const {
    state: { tr },
  } = view

  eachRight(results, range => {
    let { to, from, replace, replacePosition } = range

    if (replacePosition === 'before') {
      to -= replace.length
    }

    if (replacePosition === 'after') {
      from += replace.length
    }

    tr.insertText('', from, to)
  })

  view.dispatch(tr)
}

export default removeAll
