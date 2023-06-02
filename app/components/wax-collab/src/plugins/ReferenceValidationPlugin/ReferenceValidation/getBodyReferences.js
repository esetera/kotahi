import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import { useContext } from 'react'

const getBodyReferences = () => {
  const {
    pmViews: { main },
  } = useContext(WaxContext)

  const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc) || []
  const referenceBlock = []

  // TODO: if we're using things inside of reference lists, we need to modify the schema to include data_id, valid, and structurevalid attributes

  // 0 TODO: make sure to find all mixed_citation marks

  // 1 go through all reference nodes, find children of type paragraph and list_item
  // MAKE SURE THEY HAVE NOT BEEN FOUND AS MIXED_CITATIONS!

  allBlockNodes.forEach((node, pos) => {
    if (node.node.isBlock && node.node.attrs.class === 'reflist') {
      const refListParagraphs = DocumentHelpers.findChildrenByType(
        node.node,
        main.state.schema.nodes.paragraph,
        true,
      )

      const refListListItems = DocumentHelpers.findChildrenByType(
        node.node,
        main.state.schema.nodes.list_item,
        true,
      )

      refListParagraphs.forEach((nnode, ppos) => {
        referenceBlock.push({
          id: referenceBlock.length,
          reference: nnode.node.textContent,
        })
      })
      refListListItems.forEach((nnode, ppos) => {
        referenceBlock.push({
          id: referenceBlock.length,
          reference: nnode.node.textContent,
        })
      })
    }
  })
  console.log('References found in document: ', referenceBlock)
  return referenceBlock
}

export default getBodyReferences
