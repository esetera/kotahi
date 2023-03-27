import React, { useContext } from 'react'
import { useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { TableUnLinkModal } from '../../../../../components-TableUnLinkModal/src'

function TableUnCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)
  const [openModal, setOpenModal] = useState(false)
  const [tableArray, setTableArray] = useState([])
  const [isLinked, setIsLinked ] = useState(false)

  const handleClick = () => {
    const LinkedId = document.getElementsByClassName('tableLinking')
    let anchorLinks = []
    for (let i = 0; i < LinkedId.length; i++) {
      anchorLinks.push({
        refId: LinkedId[i].getAttribute('data-refid'),
      })
    }

    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
      tableBlock = []
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
    setIsLinked(tableBlock.length ? true : false)
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Unlinked Tables"
          onClick={() =>  handleClick()}
        />
      </div>
      <TableUnLinkModal main={main} isOpen={openModal} closeModal={() => { setOpenModal(false) }}  tableArray={tableArray} isLinked={isLinked}/>
    </>
  )
}

export default TableUnCitation
