import React, { useState, useEffect, useContext } from 'react'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import {
  Modal,
  CloseButton,
  ModalBody,
  ModalContainer,
  ReferenceContainer,
  ModalHeader,
  ModalFooter,
} from './style'
import LinkingsNotFound from '../NotFound'

export const RefModal = ({ isOpen, closeModal }) => {
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

  const persistReference = (refBlock, Id, manually) => {
    console.log('in persistReference')
    console.log(
      'refBlock.dataId: ',
      refBlock.dataId,
      'Id: ',
      Id,
      'manually: ',
      manually,
    )
    const allNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    console.log('allNodes: ', allNodes)

    const refNode = allNodes.find(node => {
      const {
        node: {
          attrs: { refId },
        },
      } = node

      console.log('refNode:', refNode)
      return manually ? refId === Id : refId === refBlock.dataId
    })

    let attrs

    if (manually) {
      const dataindex = refBlock.index
      waxRefBlocks[dataindex].valid = true
      waxRefBlocks[dataindex].needsReview = false
      attrs = { ...refNode.node.attrs, needsReview: false, valid: true }
    } else {
      const { valid, needsReview, structure, needsValidation } = refBlock
      attrs = {
        ...refNode.node.attrs,
        valid,
        needsReview,
        needsValidation,
        structure,
      }
    }

    const tr = main.state.tr.setNodeMarkup(refNode.pos, undefined, attrs)
    main.dispatch(tr)
    setWaxRefBlocks(waxRefBlocks)
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
      .filter(refBlock => refBlock.needsValidation)
      .slice(0, concurrentValidations)
      .forEach(refBlockProp => {
        refBlockProp.validate = true
      })
  }

  const onRefValidate = ({ refId, data, match, text }) => {
    const refBlock = waxRefBlocks.find(
      refBlockProp => refBlockProp.dataId === refId,
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
        refBlockProp => refBlockProp.needsValidation,
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
            index={index}
            key={index}
            needsReview={needsReview}
            onError={onError}
            onValidate={onRefValidate}
            onValidation={persistReference}
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
