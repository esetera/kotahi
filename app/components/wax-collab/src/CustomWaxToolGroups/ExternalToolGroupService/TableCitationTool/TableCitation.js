import React, { useContext } from 'react'
import { useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { TableLinkModal } from '../../../../../components-TableLinkModal/src'

function TableCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)
  const [openModal, setOpenModal] = useState(false)
  const [tableArray, setTableArray] = useState([])

  const handleClick = () => {
    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
    tableBlock = []
  allBlockNodes.forEach((node, pos) => {
    if (node.node.isBlock && node.node.attrs.class === 'tablehead') {
      tableBlock.push({
        text: node.node.textContent,
        data_id: node.node.attrs.refId ? node.node.attrs.refId : node.node.attrs.id,
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
          onClick={() =>  handleClick()}
        />
      </div>
      <TableLinkModal main={main} isOpen={openModal} closeModal={() => { setOpenModal(false) }}  tableArray={tableArray}/>
    </>
  )
}

export default TableCitation
