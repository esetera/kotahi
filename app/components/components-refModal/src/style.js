import ReactModal from 'react-modal'
import styled from 'styled-components'
import { th, darken } from '@pubsweet/ui-toolkit'
import React, { useEffect, useState } from 'react'
import { Button } from '@pubsweet/ui'
import { gql, useLazyQuery } from '@apollo/client'
import tick from './tick.svg'
import ValidateModel from '../../components-validateModal/src/index'

const GET_REFERENCES_WITH_DOI = gql`
  query getReference($doi: String!) {
    getReference(doi: $doi) {
      success
      message
      reference {
        doi
        title
        journalTitle
        page
        issue
        volume
        author {
          given
          family
          sequence
        }
      }
    }
  }
`

const GET_MATCHING_REFERENCES = gql`
  query getMatchingReferences($text: String!) {
    getMatchingReferences(input: { text: $text }) {
      success
      message
      matches {
        doi
        title
        journalTitle
        page
        issue
        volume
        author {
          given
          family
          sequence
        }
      }
    }
  }
`

const styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    width: '40%',
    height: '100%',
    padding: '3px',
    float: 'right',
    position: 'initial',
    overflow: 'hidden',
  },
}

export const ModalContainer = styled.div`
  background-color: ${th('colorBackground')};
  height: 100vh;
  z-index: 10000;
  overflow: hidden;
`
export const CloseButton = styled(Button)`
  background: ${th('configColor')};
  color: white;
  width: 100%;
  height: 100%;
  text-decoration: none;
  &:hover {
    background-color: ${darken('configColor', 0.1)};
    color: white;
  }
  cursor: pointer;
`
export const ModalHeader = styled.h4`
  text-align: center;
  background: ${th('configColor')};
  color: white;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading3')};
  line-height: 1.25em;
  padding: 0.25em 0;
`

export const ModalBody = styled.div`
  height: 87vh;
  max-width: 85%;
  min-width: 100%;
  overflow-y: scroll;
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
`

export const Rule = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading6')};
  border-radius: 2px;
  margin: 0.25rem;
  background-color: #f1f1f1;
  padding: 0px 2px;

  .loader {
    width: 1em;
    height: 1em;
    border: 2px solid;
    border-color: ${th('colorPrimary')} transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const ModalFooter = styled.div`
  height: 3rem;
`

const Paragraph = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 0.25rem;
  min-height: 6rem;
  padding: 0.25rem 0;
  width: calc(100% - 2rem);
`

export const ReferenceContainer = ({
  refId,
  text,
  valid,
  needsReview,
  index,
  onValidate,
  onValidation,
  onError,
  structure,
  validate = false,
}) => {
  const [isValidateModalOpen, SetValidateModalOpen] = useState(false)
  const [referenceText, setRefText] = useState([])

  const onErr = apolloErr => {
    setLoading(false)
    onError(refId, apolloErr)
  }

  const [queryReferenceWithDOI, doiResult] = useLazyQuery(
    GET_REFERENCES_WITH_DOI,
    {
      onCompleted: ({ getReference: { reference } }) => {
        onDoiFetchCompleted(reference)
      },
      onError: onErr,
    },
  )

  const [queryMatcingReferences, queryResult] = useLazyQuery(
    GET_MATCHING_REFERENCES,
    {
      onCompleted: ({ getMatchingReferences: { matches } }) => {
        onFetchCompleted(matches)
      },
      onError: apolloError => {
        onErr(apolloError)
      },
    },
  )

  const [loading, setLoading] = useState(false)

  const validIcon = valid === true ? <img alt="selected" src={tick} /> : ''
  const spinner = loading ? <span className="loader">&nbsp;</span> : ''

  const reviewBtn = needsReview ? (
    <button
      onClick={() => {
        SetValidateModalOpen(true)
      }}
      style={{ cursor: 'pointer' }}
      type="button"
    >
      <img
        alt="choose"
        height="24"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACW0lEQVR4nO2ZO2sVQRiGH4gKgaB4N4oYbe1ttBJECUiCf0AQS0ERReyCvaVgKVY2YpFCsRFNDkFINN7FSkTUNF6CRgvjyMAbGMbds3vOzl4G94WBnWF5v3l2Zmfm24VWrWpXBzB9lqkSvXqWKVjK8upZ/Zp0A6mqD/83yHrgROwgg3oZ7X1nYwE5D4w49QHglu55B+yMAeS4rj8C+9R2VW2fgb0ZwRsDsg64q/oP4Iaul4ADOYI3BsRqFXDFaf8NHONfNR5kRaeBZeAUyYoGZBxYAL4Dc8DRGEHGgD/e8cHWD8cGMqu2c9pDLqneiQHEJJTVumcw50HPFCyFNFWgkw968DIZxfcKopDTpla1IE2TaadWRCPScXZ7/yDZOJmcy689IZ8EZoCv2kj3EwnIBWDI2e39sgjspsEgv4CfwJqE3d6Huw3cF9RDYLSMTg7oZHsGOKR6HpAj3qExC84ty4oVTNuAeS/INDCcAyRJSXBpozQdkINrMn0DXAbeqv4a2N4HSJLSRmmJgPok012qbwQeJcAUAek2SsH0XoZ7nLYkmNCBTWiQ6zJ8LIA0mMaDbHI62g2m8SBohUqD2eDBhJIpK5exMK9kPq+RcmHuAZMB45kyk7KtwHMFeOLBhJYpO7vcUhGMqSJNdmFeavcPLVNVvm9hnpUEs1a+36hI9p15oaBPgc2BfA/K0yZixAxjVz/rN0HFclczO912FPC6KJ8v3n5VC8yCcpeRlNzF15Cm06STi4xRo+xf3DsFPoGujEStEK7sf5GbwAc93azOL+ojxERd06lVK7L1F2Uq1JLPvcCQAAAAAElFTkSuQmCC"
        width="24"
      />
    </button>
  ) : (
    ''
  )

  const extractDOI = referenceTextProp => {
    const match = referenceTextProp.match(
      /10.\d{4,9}\/[-\u2013\u2014._;()/:A-Z0-9]+/i,
    )

    const doi = match ? match[0] : ''

    return doi.replace(/\u2013\u2014/g, '-')
  }

  const doi = extractDOI(text)

  const onFetchCompleted = data => {
    setLoading(false)
    onValidate({ refId, data, match: 'multiple', text })
  }

  const onDoiFetchCompleted = data => {
    setLoading(false)
    onValidate({ refId, data, match: 'exact', text })
  }

  useEffect(() => {
    if (validate) {
      setLoading(true)
      doi
        ? queryReferenceWithDOI({
            variables: { doi },
          })
        : queryMatcingReferences({
            variables: { text },
          })
    }
  }, [validate])

  return (
    <Rule key={index}>
      <Paragraph>{text}</Paragraph>
      {spinner}
      {validIcon}
      {reviewBtn}
      {isValidateModalOpen && (
        <ValidateModel
          index={index}
          isOpen={isValidateModalOpen}
          onClose={() => {
            SetValidateModalOpen(false)
          }}
          onValidate={onValidation}
          refBlock={structure}
          referenceText={text}
          refId={refId}
        />
      )}
    </Rule>
  )
}

export const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  )
}
