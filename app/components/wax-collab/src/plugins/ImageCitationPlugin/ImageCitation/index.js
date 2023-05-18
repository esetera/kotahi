import React, { useContext, useState } from 'react'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import Button from '../ui/Button'
import ImageLinkModal from './ImageCitationModal'

function ImageCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)

  const [openModal, setOpenModal] = useState(false)
  const [imageArray, setImageArray] = useState([])

  const handleClick = () => {
    const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    const imageBlock = []
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

  const collection = document.getElementsByTagName('figure')

  const figId = []

  for (let i = 0; i < collection.length; i++) {
    const ImageSrc = collection[i].getElementsByTagName('img')
    figId.push({
      refId: collection[i].getAttribute('id'),
      src: ImageSrc[0].getAttribute('src'),
    })
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Image Name Linking"
          onClick={() => handleClick()}
        />
      </div>
      <ImageLinkModal
        closeModal={() => {
          setOpenModal(false)
        }}
        figId={figId}
        imageArray={imageArray}
        isOpen={openModal}
        main={main}
      />
    </>
  )
}

export default ImageCitation
