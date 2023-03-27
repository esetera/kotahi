import React, { useContext } from 'react'
import { useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { ImageUnLinkModal } from '../../../../../components-ImageUnLinkModal/src'

function ImageUnCitation() {
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext)
  const [openModal, setOpenModal] = useState(false)
  const [imageArray, setImageArray] = useState([])
  const [isLinked, setIsLinked] = useState(false)

  const handleClick = () => {
    const LinkedId = document.getElementsByClassName('imageLinking')

    let anchorLinks = []

    for (let i = 0; i < LinkedId.length; i++) {
      anchorLinks.push({
        refId: LinkedId[i].getAttribute('index'),
      })
    }

    let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc),
    imageBlock = []
  allBlockNodes.forEach((node, pos) => {
    if (node.node.isBlock && node.node.type.name === 'figure') {
      node.node.content.content.map(item => {
        if (item.type.name === 'image') {
            imageBlock.push({
                'src': item.attrs.src,
                'data_id': node.node.attrs.refId,
                'imageLinked': node.node.attrs.imageLinked,
                linked: node.node.attrs.linked === 'true',
            });
        }
    })
    }
  })
  const results = imageBlock.filter(
    ({ src: id1 }) => !anchorLinks.some(({ refId: id2 }) => id2.split('%')[0] === id1.split('%')[0]),
  )
  setImageArray(results)
  setIsLinked(imageBlock.length ? true : false)
  setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Unlinked Images"
          onClick={() =>  handleClick()}
        />
      </div>
      <ImageUnLinkModal isOpen={openModal} closeModal={() => { setOpenModal(false) }}  imageArray={imageArray} isLinked={isLinked}/>
    </>
  )
}

export default ImageUnCitation
