import React, { useContext } from 'react'
import { useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { ReferenceUnLinkModal } from '../../../../../components-ReferenceUnLinkingModal/src'

function ReferenceUnCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)
  const [openModal, setOpenModal] = useState(false)
  const [ refArray, setRefArray] = useState([])
  const [ isLinked, setIsLinked ] = useState(false)

  const handleClick = () => {
    const numberId = document.getElementsByClassName('referenceLinking')
    const textId = document.getElementsByClassName('authorLinking')
    let Id = []

    for (let i = 0; i < numberId.length; i++) {
      Id.push({
        refId: numberId[i].getAttribute('data-refid'),
      })
    }

    for (let i = 0; i < textId.length; i++) {
      Id.push({
        refId: textId[i].getAttribute('data-refid'),
      })
    }

    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
      referenceBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'reference') {
        referenceBlock.push({
          text: node.node.textContent,
          data_id: node.node.attrs.refId
            ? node.node.attrs.refId
            : node.node.attrs.id,
          linked: node.node.attrs.linked === 'true',
        })
      }
    })

    const results = referenceBlock.filter(
      ({ data_id: id1 }) => !Id.some(({ refId: id2 }) => id2 === id1),
    )
    setRefArray(results)
    setIsLinked(referenceBlock.length ? true : false)
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Unlinked References"
          onClick={() =>  handleClick()}
        />
      </div>
      <ReferenceUnLinkModal isOpen={openModal} closeModal={() => { setOpenModal(false) }}  refArray={refArray} isLinked={isLinked}/>
    </>
  )
}

export default ReferenceUnCitation
