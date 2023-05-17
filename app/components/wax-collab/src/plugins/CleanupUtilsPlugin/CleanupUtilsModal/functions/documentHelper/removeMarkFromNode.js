const removeMarkFromNode = (view, inline, mark) => {
  const textLength = inline.text ? inline.text.length : inline.node.text.length
  const fromMark = inline.pos ? inline.pos : inline.from
  const toMark = inline.to ? inline.to : textLength + fromMark

  const {
    state: { tr },
  } = view

  tr.removeMark(fromMark, toMark, mark)
  view.dispatch(tr)
}

export default removeMarkFromNode
