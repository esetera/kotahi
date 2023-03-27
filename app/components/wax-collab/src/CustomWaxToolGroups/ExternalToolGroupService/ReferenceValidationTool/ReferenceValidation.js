import React from 'react'
import { useState } from 'react'
import Button from '../../../../../asset-manager/src/ui/Modal/Button'
import { RefModal } from '../../../../../components-refModal/src/index'

function ReferenceValidation() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Reference Linking and validation"
          title="Reference Validation"
          onClick={() => { setOpenModal(true) }}
        />
      </div>
      <RefModal isOpen={openModal} closeModal={() => { setOpenModal(false) }}></RefModal>
    </>
  )
}

export default ReferenceValidation
