const replace = (view, range) => {
  // debugger;
  const {
    state: { tr },
  } = view

  let { to, from, replace, text } = range
  text = ''
  tr.insertText(replace, from, to)
  view.dispatch(tr)
}

export default replace
