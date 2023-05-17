const remove = (view, range) => {
  const {
    state: { tr },
  } = view

  let { to, from, replace, replacePosition } = range

  if (replacePosition === 'before') {
    to -= replace.length
  }

  if (replacePosition === 'after') {
    from += replace.length
  }

  tr.insertText('', from, to)
  view.dispatch(tr)
}

export default remove
