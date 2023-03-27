const getFigureNodes = (blockNodes) => {
    const figureNodes = blockNodes.filter(
      blockNode => {
        return blockNode?.node?.type?.name == 'figure'
      }
    )

    const figureNodeOffset = 1;

    return figureNodes.map((figureNode, index) => {
      const figureNodeFromPosition = figureNode.pos;
      const figureNodeText = `Figure ${index}`;
      const figureNodeToPosition = figureNodeFromPosition + figureNodeOffset;

      return {
        'from': figureNodeFromPosition,
        'text': figureNodeText,
        'to': figureNodeToPosition,
        'replaceType': 'remove'
      }

    })
  }

  export default getFigureNodes