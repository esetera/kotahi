import React, { useContext, useState } from 'react'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import Button from '../ui/Button'
import TableLinkModal from './TableLinkModal'

function TableCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)

  const [openModal, setOpenModal] = useState(false)
  const [tableArray, setTableArray] = useState([])

  const handleClick = () => {
    const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    const tableBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'tablehead') {
        tableBlock.push({
          text: node.node.textContent,
          data_id: node.node.attrs.refId
            ? node.node.attrs.refId
            : node.node.attrs.id,
        })
      }
    })
    setTableArray(tableBlock)
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Table Name Linking"
          onClick={() => handleClick()}
        />
      </div>
      <TableLinkModal
        closeModal={() => {
          setOpenModal(false)
        }}
        isOpen={openModal}
        main={main}
        tableArray={tableArray}
      />
    </>
  )
}

export default TableCitation
