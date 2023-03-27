const getUnderLinedAndLinkNode = (_inlineNodes, type) => {
  const updatedInlineNode = [];
  _inlineNodes.forEach(_inlineNode => {
    const markers = _inlineNode.node.marks
    const markerTypeMatch = markers.some(marker => marker?.type?.name == type)
    if (markerTypeMatch) {
      const _inlineNodeFromPosition = _inlineNode.pos;
      const _inlineNodeText = _inlineNode.text || _inlineNode.node.text;
      const _inlineNodeLen = _inlineNodeText.length;
      const _inlineNodetoPosition = _inlineNodeFromPosition + _inlineNodeLen;
      updatedInlineNode.push({
        'from': _inlineNodeFromPosition,
        'text': _inlineNodeText,
        'to': _inlineNodetoPosition,
        'replaceType': 'remove',
        'ruleType': markers[0].type.name
      })
    }
  })
  return updatedInlineNode;
}

export default getUnderLinedAndLinkNode;