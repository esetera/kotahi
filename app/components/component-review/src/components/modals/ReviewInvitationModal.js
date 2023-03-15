import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import { Button } from '@pubsweet/ui'

const styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    overflow: 'scroll',
  },

  content: {
    backgroundColor: '#303030',
    border: 'none',
    width: 'fit-content',
    height: 'fit-content',
    margin: '0 auto',
    padding: '0',
    overflow: 'none',
  },
}

const ModalContainer = styled.div`
  background-color: ${th('colorBackground')};
  padding: ${grid(2.5)} ${grid(3)};
  z-index: 10000;
`

const CancelButton = styled(Button)`
  background-color: ${th('colorFurniture')};
  margin-left: 1em;
  padding: ${grid(1)};
  text-decoration: none;

  &:hover {
    background-color: ${darken('colorFurniture', 0.1)};
  }
`

const MessageString = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${grid(2.5)};
  width: 100%;
`

const ModalClose = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const ModalCloseButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  margin-bottom: 4px;
  text-align: right;
`

const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  )
}

/** A convenient modal that shows the supplied message and OK, Cancel buttons, and will call the supplied action and close functions as appropriate. */
const ReviewInvitationModal = ({
  isOpen = false,
  message,
  onConfirm,
  onReject,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContainer>
        <ModalClose>
          <ModalCloseButton onClick={onCancel} type="button">
            &times;
          </ModalCloseButton>
        </ModalClose>
        <MessageString>{message}</MessageString>
        <Button onClick={() => onConfirm()} primary>
          Accept
        </Button>
        <CancelButton onClick={onReject}>Reject</CancelButton>
      </ModalContainer>
    </Modal>
  )
}

// import React from 'react'
// import { Button } from '@pubsweet/ui'
// import ReactModal from 'react-modal'
// import styled from 'styled-components'

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// }

// const AcceptButton = styled(Button)`
//   cursor: pointer;
// `

// const RejectButton = styled(Button)`
//   cursor: pointer;
//   background-color: #e8e8e8;
//   padding: calc(8px * 1);
//   text-decoration: none;
//   margin-left: 1em;
//   &:hover {
//     background-color: hsl(0, 0%, 81.9%);
//   }
// `

// ReactModal.setAppElement('#root')

// const ReviewInvitationModal = ({
//   show = false,
//   manuscript,
//   onAccept,
//   onReject,
//   onCancel,
// }) => {
//   return (
//     <ReactModal
//       contentLabel="Example Modal"
//       isOpen={show}
//       onAfterOpen={() => {}}
//       onRequestClose={() => {}}
//       style={customStyles}
//     >
//       <div
//         style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
//       >
//         <button
//           onClick={onCancel}
//           style={{
//             textAlign: 'right',
//             cursor: 'pointer',
//             fontSize: '24px',
//             marginBottom: '10px',
//             backgroundColor: 'transparent',
//           }}
//           type="button"
//         >
//           &times;
//         </button>
//       </div>
//       <div style={{ marginBottom: '10px' }}>
//         You have been invited to peer review the manuscript{' '}
//         {manuscript.meta.title}
//       </div>
//       <AcceptButton onClick={onAccept} primary>
//         Accept
//       </AcceptButton>
//       <RejectButton onClick={onReject}>Reject</RejectButton>
//     </ReactModal>
//   )
// }

export default ReviewInvitationModal
