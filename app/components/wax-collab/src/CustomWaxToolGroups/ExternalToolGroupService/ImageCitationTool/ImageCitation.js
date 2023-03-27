import React, { useContext } from 'react'
import { useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { ImageLinkModal } from '../../../../../components-ImageLinkModal/src'

function ImageCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)
  const [openModal, setOpenModal] = useState(false)
  const [imageArray, setImageArray] = useState([])

  const handleClick = () => {
    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
    imageBlock = []
  allBlockNodes.forEach((node, pos) => {
    if (node.node.isBlock && node.node.type.name === 'figure') {
      node.node.content.content.map(item => {
        if (item.type.name === 'image') {
          imageBlock.push({
            src: item.attrs.src,
            data_id: node.node.attrs.refId,
            linked: node.node.attrs.linked === 'true',
          })
        }
      })
    }
  })
  setImageArray(imageBlock)
  setOpenModal(true)
  }

  const collection = document.getElementsByTagName("figure");

    let figId = []
  
    for (let i = 0; i < collection.length; i++) {
      const ImageSrc = collection[i].getElementsByTagName("img")
      figId.push({
        refId: collection[i].getAttribute('id'),
        src: ImageSrc[0].getAttribute('src')
      })
    }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Image Name Linking"
          onClick={() =>  handleClick()}
        />
      </div>
      <ImageLinkModal main={main} figId={figId} isOpen={openModal} closeModal={() => { setOpenModal(false) }}  imageArray={imageArray}/>
    </>
  )
}

export default ImageCitation
