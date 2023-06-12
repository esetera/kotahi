import React, { useState, useContext } from 'react'
import { WaxContext } from 'wax-prosemirror-core'

import styled from 'styled-components'
import { RefModal } from '../../../../components-refModal/src'
import Button from '../../../../asset-manager/src/ui/Modal/Button'

const Wrapper = styled.div`
  display: flex;
  align-items: center !important;
  padding-left: 4px;
  padding-right: 4px;
  margin-top: 3px;
`

const ReferenceValidation = () => {
  const {
    pmViews: { main },
  } = useContext(WaxContext)

  const [openModal, setOpenModal] = useState(false)
  return (
    <Wrapper>
      <div>
        <Button
          className="px-4 dropbtn"
          icon={
            <svg
              data-name="Layer 1"
              height="22px"
              id="Layer_1"
              viewBox="0 4 36 18"
              width="22px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.59,13.71l4.23-4.25a5.14,5.14,0,0,1,7.28,0,5.19,5.19,0,0,1,0,7.31L25.89,21a1.14,1.14,0,0,0,1.6,1.61l4.22-4.24a7.47,7.47,0,0,0,0-10.52,7.4,7.4,0,0,0-10.49,0L17,12.11a1.14,1.14,0,0,0,1.6,1.61Z"
                fill="#282827"
                transform="translate(-5.35 -5.67)"
              />
              <path
                d="M20.64,26.22,16.4,30.47a5.14,5.14,0,0,1-7.28,0,5.19,5.19,0,0,1,0-7.31l4.21-4.24a1.14,1.14,0,1,0-1.6-1.61L7.52,21.56a7.47,7.47,0,0,0,0,10.52,7.4,7.4,0,0,0,10.49,0l4.23-4.25a1.14,1.14,0,0,0-1.6-1.61Z"
                fill="#282827"
                transform="translate(-5.35 -5.67)"
              />
              <path
                d="M24.17,16.73a1.14,1.14,0,1,0-1.55-1.66L13.9,23.8a1.14,1.14,0,0,0,1.55,1.66Z"
                fill="#282827"
                transform="translate(-5.35 -5.67)"
              />
            </svg>
          }
          onClick={() => {
            setOpenModal(true)
          }}
          title="Reference validation"
        />
      </div>
      <RefModal
        closeModal={() => {
          setOpenModal(false)
        }}
        isOpen={openModal}
      />
    </Wrapper>
  )
}

export default ReferenceValidation
