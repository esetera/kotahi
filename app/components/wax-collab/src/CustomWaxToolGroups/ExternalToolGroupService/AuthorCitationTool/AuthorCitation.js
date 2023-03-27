import React, { useContext } from 'react'
import { useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { AuthorLinkModal } from '../../../../../components-AuthorLinkingModal/src'

function AuthorCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)
  const [openModal, setOpenModal] = useState(false)
  const [authorArray, setAuthorArray] = useState([])

  const handleClick = () => {
    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
      referenceBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'reference') {
        referenceBlock.push({
          text: node.node.textContent,
          data_id: node.node.attrs.refId ? node.node.attrs.refId : node.node.attrs.id ,
          valid: node.node.attrs.valid === 'true',
        })
      }
    })
    setAuthorArray(referenceBlock)
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Author Name Linking"
          onClick={() =>  handleClick()}
        />
      </div>
      <AuthorLinkModal main={main} isOpen={openModal} closeModal={() => { setOpenModal(false) }}  authorArray={authorArray}/>
    </>
  )
}

export default AuthorCitation
