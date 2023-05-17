import React, { useContext, useState } from 'react'

import { WaxContext } from 'wax-prosemirror-core'
import Button from './ui/Button'
import { CleanupUtilsModal } from './CleanupUtilsModal'

function CleanupUtils() {
  const [openModal, setOpenModal] = useState(false)

  const { pmViews /* options */ } = useContext(WaxContext)

  const handleClick = () => {
    setOpenModal(true)
  }

  return (
    <>
      <div>
        <Button
          className="px-4"
          icon={
            <svg
              data-name="Layer 1"
              id="Layer_1"
              viewBox="0 0 25.33 23.84"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M312.77,412.17h.38l.24-1.35.28,1.35h8.46a6,6,0,0,1,0-2.32c.16.9.17,1.89.62,2.32h2.34s.75-.29.88-.38.1-.74,0-1l.71,1,.54-.33a6.65,6.65,0,0,1-1.71-4.86c.11-1.18.38-1.58.35-1.84s0-.76-.78-.69c-1.28,0-8.69,0-8.69,0a1.23,1.23,0,0,0-1.09.51,9.85,9.85,0,0,0-2.25,5.19A16.36,16.36,0,0,0,312.77,412.17Z"
                fill="#525E76"
                transform="translate(-312.27 -396.7)"
              />
              <path
                d="M315.94,403.83h9.59a.76.76,0,0,1,.5.8c.09,0,.24-.05.4-.4s.69-1.75.69-1.75a.83.83,0,0,0-.76-.9l-2.91-.09s1.35-2.11,1.57-2.63a1.18,1.18,0,0,0-.69-1.64,1.54,1.54,0,0,0-1.7,1c-.41,1-1.56,3.32-1.56,3.32s-2.94.07-3.08.05-.42.07-.69.48S315.94,403.83,315.94,403.83Z"
                fill="#525E76"
                transform="translate(-312.27 -396.7)"
              />
              <path
                d="M334.22,409.54a3.15,3.15,0,0,1,1.56.4l.5.26-.42.4-1.8,1.82.66.66,1.82-1.8.4-.42.26.5a3.15,3.15,0,0,1,.4,1.56,3.38,3.38,0,0,1-3.38,3.38l-.37,0-3.6,3.62a2.13,2.13,0,1,1-3-3l3.62-3.6c0-.21,0-.33,0-.37a3.38,3.38,0,0,1,3.38-3.38Zm0,.85a2.53,2.53,0,0,0-2.54,2.54,2.18,2.18,0,0,0,0,.42l.08.21-.19.16-3.78,3.78a1.28,1.28,0,0,0,0,1.8v0a1.31,1.31,0,0,0,1.82,0l3.78-3.78.16-.19.21.08a2.18,2.18,0,0,0,.42,0,2.53,2.53,0,0,0,2.54-2.54.63.63,0,0,0,0-.17c0-.06,0-.13-.05-.2a1.39,1.39,0,0,0-.05-.16L335,414l-.29.32-.29-.32-1.27-1.27-.32-.29.32-.29,1.59-1.61A2.26,2.26,0,0,0,334.22,410.39Z"
                fill="#525E76"
                transform="translate(-312.27 -396.7)"
              />
            </svg>
          }
          onClick={() => handleClick()}
          title="Cleanup Utils"
        />
      </div>
      <CleanupUtilsModal
        closeModal={() => setOpenModal(false)}
        isOpen={openModal}
        view={pmViews}
      />
    </>
  )
}

export default CleanupUtils
