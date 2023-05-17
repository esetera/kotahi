const flatten = (node, descend = true) => {
  if (!node) {
    throw new Error('Invalid "node" parameter')
  }

  const result = []
  node.descendants((child, pos) => {
    result.push({ node: child, pos })

    if (!descend) {
      return false
    }
  })
  return result
}

export default flatten
