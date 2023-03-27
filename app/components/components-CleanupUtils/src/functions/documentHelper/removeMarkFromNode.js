const removeMarkFromNode = (view, inline, mark) => {
  let textLength = inline.text ? inline.text.length : inline.node.text.length;
  let fromMark = inline.pos ? inline.pos : inline.from;
  let toMark = inline.to ? inline.to : textLength + fromMark;
  const {
    state: { tr },
  } = view;
  tr.removeMark(fromMark, toMark, mark);
  view.dispatch(tr);
}

export default removeMarkFromNode;