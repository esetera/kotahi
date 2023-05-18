import React, { useState } from 'react'

import Button from '../ui/Button'
import RefModal from './RefModal'

function ReferenceValidation() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div>
        <Button
          className="px-4"
          label="Reference Linking & Validation"
          onClick={() => {
            setOpenModal(true)
          }}
          title="Reference Validation"
        />
      </div>
      <RefModal
        closeModal={() => {
          setOpenModal(false)
        }}
        isOpen={openModal}
      />
    </>
  )
}

export default ReferenceValidation
