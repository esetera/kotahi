const getHardBreakNodes = (blockNodes, replacementType) => {
    const hardBreakNodes = blockNodes.filter(blockNode => {
      const node = blockNode?.node;
      const isBlock = node?.isBlock;
      const isParagrapgClass = node?.attrs.class == 'paragraph';
      const emptyText = node?.textContent == '';

      return (isBlock && isParagrapgClass && emptyText)
    })

    const hardBreakNodeOffset = 1;

    return hardBreakNodes.map(hardBreakNode => {
      const hardBreakNodeFromPosition = hardBreakNode.pos;
      const hardBreakNodetext = 'HardBreak'
      const hardBreakNodeToPosition = hardBreakNodeFromPosition + hardBreakNodeOffset;
      return {
        'from': hardBreakNodeFromPosition,
        'text': hardBreakNodetext,
        'to': hardBreakNodeToPosition,
        'replaceType': replacementType
      }
    })
  }

  export default getHardBreakNodes;