import React, { useState, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/client'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import {
  Modal,
  Paragraph,
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalFooter,
  Rule,
} from './style'
import { LinkingsNotFound } from '../../components-notFound/src'
import tick from './tick.svg'
import ValidateModel from '../../components-validateModal/src/index'
import { GET_REFERENCES_WITH_DOI, GET_MATCHING_REFERENCES } from './queries'

const extractDOI = referenceText => {
  const match = referenceText.match(
    /10.\d{4,9}\/[-\u2013\u2014._;()/:A-Z0-9]+/i,
  )

  const doi = match ? match[0] : ''

  return doi.replace(/\u2013\u2014/g, '-')
}

export const ReferenceContainer = ({
  refId,
  text,
  valid,
  needsReview,
  index,
  onValidate,
  onError,
  structure,
  validate = false,
}) => {
  const [isValidateModalOpen, SetValidateModalOpen] = useState(false)
  // const [referenceText, setRefText] = useState([])

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

  const validIcon = valid === true ? <img alt="linked" src={tick} /> : ''
  const spinner = loading ? <span className="loader">&nbsp;</span> : ''

  const reviewBtn = needsReview ? (
    <button
      onClick={() => {
        SetValidateModalOpen(true)
      }}
      type="button"
    >
      <img
        alt="Link this reference"
        height="24"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACW0lEQVR4nO2ZO2sVQRiGH4gKgaB4N4oYbe1ttBJECUiCf0AQS0ERReyCvaVgKVY2YpFCsRFNDkFINN7FSkTUNF6CRgvjyMAbGMbds3vOzl4G94WBnWF5v3l2Zmfm24VWrWpXBzB9lqkSvXqWKVjK8upZ/Zp0A6mqD/83yHrgROwgg3oZ7X1nYwE5D4w49QHglu55B+yMAeS4rj8C+9R2VW2fgb0ZwRsDsg64q/oP4Iaul4ADOYI3BsRqFXDFaf8NHONfNR5kRaeBZeAUyYoGZBxYAL4Dc8DRGEHGgD/e8cHWD8cGMqu2c9pDLqneiQHEJJTVumcw50HPFCyFNFWgkw968DIZxfcKopDTpla1IE2TaadWRCPScXZ7/yDZOJmcy689IZ8EZoCv2kj3EwnIBWDI2e39sgjspsEgv4CfwJqE3d6Huw3cF9RDYLSMTg7oZHsGOKR6HpAj3qExC84ty4oVTNuAeS/INDCcAyRJSXBpozQdkINrMn0DXAbeqv4a2N4HSJLSRmmJgPok012qbwQeJcAUAek2SsH0XoZ7nLYkmNCBTWiQ6zJ8LIA0mMaDbHI62g2m8SBohUqD2eDBhJIpK5exMK9kPq+RcmHuAZMB45kyk7KtwHMFeOLBhJYpO7vcUhGMqSJNdmFeavcPLVNVvm9hnpUEs1a+36hI9p15oaBPgc2BfA/K0yZixAxjVz/rN0HFclczO912FPC6KJ8v3n5VC8yCcpeRlNzF15Cm06STi4xRo+xf3DsFPoGujEStEK7sf5GbwAc93azOL+ojxERd06lVK7L1F2Uq1JLPvcCQAAAAAElFTkSuQmCC"
        width="24"
      />
    </button>
  ) : (
    ''
  )

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
          isOpen={isValidateModalOpen}
          onClose={() => {
            SetValidateModalOpen(false)
          }}
          onValidate={() => ''}
          refBlock={structure}
          referenceText={text}
        />
      )}
    </Rule>
  )
}

const RefModal = ({ isOpen, closeModal }) => {
  const [waxRefBlocks, setWaxRefBlocks] = useState([])
  const concurrentValidations = 2

  const {
    pmViews: { main },
  } = useContext(WaxContext)

  useEffect(() => {
    if (!isOpen) return

    const referenceBlocks = DocumentHelpers.findBlockNodes(main.state.doc)
      .filter(block => {
        const {
          node: {
            isBlock,
            attrs: { class: klass },
          },
        } = block

        return isBlock && (klass === 'ref-tx' || klass === 'ref')
      })
      .map(referenceBlock => {
        const {
          node: {
            textContent,
            attrs: {
              valid,
              refId,
              id,
              structure,
              needsValidation,
              needsReview,
            },
          },
          pos,
        } = referenceBlock

        return {
          text: textContent,
          dataId: refId || id,
          valid,
          validate: false,
          error: false,
          needsReview,
          needsValidation,
          structure,
          pos,
        }
      })

    setWaxRefBlocks(referenceBlocks)
  }, [isOpen])

  const persistReference = refBlock => {
    const allNodes = DocumentHelpers.findBlockNodes(main.state.doc)

    const refNode = allNodes.find(node => {
      const {
        node: {
          attrs: { refId },
        },
      } = node

      return refId === refBlock.dataId
    })

    const { valid, needsReview, structure, needsValidation } = refBlock

    const attrs = {
      ...refNode.node.attrs,
      valid,
      needsReview,
      needsValidation,
      structure,
    }

    const tr = main.state.tr.setNodeMarkup(refNode.pos, undefined, attrs)
    main.dispatch(tr)
  }

  const handleClose = () => {
    closeModal()
  }

  const findMostRelaventReference = (matchingReferences, referenceText) => {
    const matchesTitle = ref => referenceText.includes(ref.title)

    const matchesFirstAuthor = ref => {
      const firstAuthor = ref?.author?.find(
        author => author.sequence === 'first',
      )

      return (
        referenceText.includes(firstAuthor?.family) ||
        referenceText.includes(firstAuthor?.given)
      )
    }

    const matchesJournalTitle = ref => referenceText.includes(ref.journalTitle)

    const matchesPage = ref => {
      return (
        referenceText.includes(ref.page) ||
        referenceText.includes(ref.page?.replace('-', '\u2013')) ||
        referenceText.includes(ref.page?.replace('-', '\u2014'))
      )
    }

    const matchesIssue = ref => referenceText.includes(ref.issue)
    const matchesVolume = ref => referenceText.includes(ref.volume)

    return matchingReferences.find(reference => {
      return (
        matchesTitle(reference) &&
        matchesFirstAuthor(reference) &&
        (matchesJournalTitle(reference) ||
          matchesPage(reference) ||
          matchesIssue(reference) ||
          matchesVolume(reference))
      )
    })
  }

  // Kick off initial set of validations. The rest will continue as each gets completed.
  const intiateValidation = () => {
    waxRefBlocks
      .filter(thisRefBlock => thisRefBlock.needsValidation)
      .slice(0, concurrentValidations)
      .forEach(thisRefBlock => {
        thisRefBlock.validate = true
      })
  }

  const onRefValidate = ({ refId, data, match, text }) => {
    const refBlock = waxRefBlocks.find(
      thisRefBlock => thisRefBlock.dataId === refId,
    )

    if (refBlock) {
      if (match === 'multiple') {
        const refMatch = findMostRelaventReference(data, text)
        refBlock.structure = refMatch || data
        refBlock.valid = !!refMatch
      } else {
        refBlock.structure = data
        refBlock.valid = true
      }

      // We don't need another CrossRef check
      refBlock.needsValidation = false

      // Needs human review only for references with multiple matches
      refBlock.needsReview = Array.isArray(refBlock.structure)

      // Save the data to HTML
      persistReference(refBlock)

      // Initiate the next reference for validation
      const unvalidatedRefBlock = waxRefBlocks.find(
        thisRefBlock => thisRefBlock.needsValidation,
      )

      if (unvalidatedRefBlock) unvalidatedRefBlock.validate = true

      setWaxRefBlocks([...waxRefBlocks])
    }
  }

  const onError = () => {}

  const renderReferences = () => {
    if (waxRefBlocks.length === 0) {
      return <LinkingsNotFound text="No references found!" />
    }

    return waxRefBlocks.map(
      ({ text, validate, valid, dataId, needsReview, structure }, index) => {
        return (
          <ReferenceContainer
            key={index}
            needsReview={needsReview}
            onError={onError}
            onValidate={onRefValidate}
            refId={dataId}
            structure={structure}
            text={text}
            valid={valid}
            validate={validate}
          />
        )
      },
    )
  }

  return (
    <>
      <Modal isOpen={isOpen} onAfterOpen={intiateValidation()}>
        <ModalContainer>
          <ModalHeader>References</ModalHeader>
          <ModalBody>{renderReferences()}</ModalBody>
          <ModalFooter>
            <CloseButton onClick={handleClose}>Close</CloseButton>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </>
  )
}

export default RefModal
