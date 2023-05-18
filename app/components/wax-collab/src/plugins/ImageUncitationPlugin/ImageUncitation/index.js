import React, { useContext, useState } from 'react'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import Button from '../ui/Button'
import ImageUnlinkModal from './ImageUncitationModal'

const ImageUncitation = () => {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)

  const [openModal, setOpenModal] = useState(false)
  const [imageArray, setImageArray] = useState([])
  const [isLinked, setIsLinked] = useState(false)

  const handleClick = () => {
    const LinkedId = document.getElementsByClassName('imageLinking')

    const anchorLinks = []

    for (let i = 0; i < LinkedId.length; i++) {
      anchorLinks.push({
        refId: LinkedId[i].getAttribute('index'),
      })
    }

    const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    const imageBlock = []
    allBlockNodes.forEach((node, pos) => {
      if (node.node.isBlock && node.node.type.name === 'figure') {
        node.node.content.content.map(item => {
          if (item.type.name === 'image') {
            imageBlock.push({
              src: item.attrs.src,
              data_id: node.node.attrs.refId,
              imageLinked: node.node.attrs.imageLinked,
              linked: node.node.attrs.linked === 'true',
            })
          }
        })
      }
    })

    const results = imageBlock.filter(
      ({ src: id1 }) =>
        !anchorLinks.some(
          ({ refId: id2 }) => id2.split('%')[0] === id1.split('%')[0],
        ),
    )

    setImageArray(results)
    setIsLinked(!!imageBlock.length)
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Unlinked Images"
          onClick={() => handleClick()}
        />
      </div>
      <ImageUnlinkModal
        closeModal={() => {
          setOpenModal(false)
        }}
        imageArray={imageArray}
        isLinked={isLinked}
        isOpen={openModal}
      />
    </>
  )
}

export default ImageUncitation
