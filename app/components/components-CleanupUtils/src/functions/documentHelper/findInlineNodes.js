import findChildren from './findChildren'

const findInlineNodes = (node, descend) => {
    return findChildren(node, (child) => child.isInline, descend);
  };

export default findInlineNodes;