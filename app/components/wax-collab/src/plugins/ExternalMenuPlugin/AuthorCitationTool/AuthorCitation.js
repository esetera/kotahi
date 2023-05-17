import React, { useState, useContext } from 'react'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
// import { AuthorLinkModal } from '../../../../../components-AuthorLinkingModal/src'

function AuthorCitation() {
  const {
    pmViews: { main },
    // options,
  } = useContext(WaxContext)

  const [openModal, setOpenModal] = useState(false)
  const [authorArray, setAuthorArray] = useState([])

  const handleClick = () => {
    const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    const referenceBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.attrs.class === 'reference') {
        referenceBlock.push({
          text: node.node.textContent,
          data_id: node.node.attrs.refId
            ? node.node.attrs.refId
            : node.node.attrs.id,
          valid: node.node.attrs.valid === 'true',
        })
      }
    })
    setAuthorArray(referenceBlock)
    setOpenModal(true)
    console.log('Setting modal open!')
    console.log("This hasn't been implemented yet.")
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Author Name Linking"
          onClick={() => handleClick()}
        />
      </div>
      {/* <AuthorLinkModal
        authorArray={authorArray}
        closeModal={() => {
          setOpenModal(false)
        }}
        isOpen={openModal}
        main={main}
      /> */}
    </>
  )
}

export default AuthorCitation
