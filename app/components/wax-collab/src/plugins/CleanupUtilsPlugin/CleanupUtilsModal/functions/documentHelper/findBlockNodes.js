import findChildren from './findChildren'

const findBlockNodes = (node, descend) => {
  return findChildren(node, child => child.isBlock, descend)
}

export default findBlockNodes
