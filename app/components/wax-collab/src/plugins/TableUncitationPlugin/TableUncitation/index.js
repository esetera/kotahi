import React, { useContext, useState } from 'react'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import Button from '../ui/Button'
import TableUnLinkModal from './TableUnlinkModal'

const TableUncitation = () => {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)

  const [openModal, setOpenModal] = useState(false)
  const [tableArray, setTableArray] = useState([])
  const [isLinked, setIsLinked] = useState(false)

  const handleClick = () => {
    const LinkedId = document.getElementsByClassName('tableLinking')
    const anchorLinks = []

    for (let i = 0; i < LinkedId.length; i++) {
      anchorLinks.push({
        refId: LinkedId[i].getAttribute('data-refid'),
      })
    }

    const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    const tableBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'tablehead') {
        console.log('node', node)
        tableBlock.push({
          text: node.node.textContent,
          data_id: node.node.attrs.refId
            ? node.node.attrs.refId
            : node.node.attrs.id,
          tableLinked: node.node.attrs.tableLinked,
          linked: node.node.attrs.linked === 'true',
        })
      }
    })

    const results = tableBlock.filter(
      ({ data_id: id1 }) => !anchorLinks.some(({ refId: id2 }) => id2 === id1),
    )

    setTableArray(results)
    setIsLinked(!!tableBlock.length)
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Unlinked Tables"
          onClick={() => handleClick()}
        />
      </div>
      <TableUnLinkModal
        closeModal={() => {
          setOpenModal(false)
        }}
        isLinked={isLinked}
        isOpen={openModal}
        main={main}
        tableArray={tableArray}
      />
    </>
  )
}

export default TableUncitation
