import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core'
import axios from 'axios'
import config from 'config'
import ValidateModal from './validateModal'
import {
  Modal,
  CloseButton,
  ModalBody,
  ModalContainer,
  LabelContainer,
  ModalHeader,
  ModalFooter,
} from './style'
import UPDATE_VALIDATION from './queries'

const RefModal = ({ isOpen, closeModal }) => {
  const [isValidateModalOpen, SetValidateModalOpen] = useState(false)
  const [referenceText, setRefText] = useState([])
  const [referenceArray, setReferenceArray] = useState([])
  const [validatedText, setvalidatedText] = useState([])
  const { port, protocol, host } = config.pagedjs
  const serverUrl = `${protocol}://${host}${port ? `:${port}` : ''}`
  const [createReferenceValidation] = useMutation(UPDATE_VALIDATION)

  const {
    pmViews: { main },
  } = useContext(WaxContext)

  const openValidatePopup = refrenceTexts => {
    if (refrenceTexts.status !== undefined) {
      setRefText(refrenceTexts)
      SetValidateModalOpen(true)
    }
  }

  const getRefTextId = refText => {
    let id = -1
    referenceArray.findIndex(ele => {
      if (ele.text === refText) {
        id = ele.id
      }
    })
    return id
  }

  const onValidate = async validateText => {
    console.log('running onValidate, validateText: ', validateText)

    const response = await createReferenceValidation({
      variables: { reference: validateText },
    })

    if (response.data?.createReferenceValidation.succeeded) {
      const id = getRefTextId(validateText)
      setvalidatedText([...validatedText, id])
    }

    SetValidateModalOpen(false)
  }

  const handleClose = () => {
    closeModal()
    // setReferenceArray(Titles)
  }

  const getAxios = newRef => {
    const graphqlQuery = {
      operationName: 'getreferencevalidation',
      query:
        'mutation getreferencevalidation($reference: String!) {\n  createReferenceValidation(reference: $reference) {\n  reference\n  responseData\n    succeeded\n    errorMessage\n    __typename\n  }\n}\n',
      variables: {},
    }

    graphqlQuery.variables = { reference: `${newRef}` }
    return axios({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000/graphql'
          : serverUrl,
      method: 'post',
      data: graphqlQuery,
    })
      .then(res =>
        res.data.data.createReferenceValidation != null
          ? res.data.data.createReferenceValidation
          : 'Error',
      )
      .catch(() => {
        return 'Error'
      })
  }

  const isValidated = responseData => {
    const response =
      responseData.responseData && JSON.parse(responseData.responseData).items

    {
      response &&
        response.map(ele => {
          if (responseData.reference.match(ele.DOI) && ele.DOI !== undefined)
            return true
        })
    }

    return false
  }

  const validateAll = async () => {
    console.log('running validateAll')
    const axiosValue = []
    referenceArray.forEach(ele => {
      axiosValue.push(getAxios(ele.reference))
    })
    Promise.all(axiosValue).then(result => {
      const response = []
      result.forEach((element, index) => {
        element = element !== 'Error' ? element : referenceArray[index]
        response.push({
          index: `${index}`,
          reference: `${element.reference}`,
          response: `${element.responseData}`,
          status: `${element.succeeded}`,
          isValidated: isValidated(element),
        })
      })
      setReferenceArray(response)
    })
  }

  useEffect(() => {
    if (isOpen) {
      console.log('modal opened, finding references')

      // TODO: this will need to change

      const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc) || []

      const referenceBlock = []

      // TODO: if we're using things inside of reference lists, we need to modify the schema to include data_id, valid, and structurevalid attributes

      // 0 TODO: make sure to find all mixed_citation marks

      // 1 go through all reference nodes, find children of type paragraph and list_item
      // MAKE SURE THEY HAVE NOT BEEN FOUND AS MIXED_CITATIONS!

      allBlockNodes.forEach((node, pos) => {
        if (node.node.isBlock && node.node.attrs.class === 'reflist') {
          const refListParagraphs = DocumentHelpers.findChildrenByType(
            node.node,
            main.state.schema.nodes.paragraph,
            true,
          )

          const refListListItems = DocumentHelpers.findChildrenByType(
            node.node,
            main.state.schema.nodes.list_item,
            true,
          )

          refListParagraphs.forEach((nnode, ppos) => {
            referenceBlock.push({
              id: referenceBlock.length,
              reference: nnode.node.textContent,
            })
          })
          refListListItems.forEach((nnode, ppos) => {
            referenceBlock.push({
              id: referenceBlock.length,
              reference: nnode.node.textContent,
            })
          })
        }
      })
      console.log('References found in document: ', referenceBlock)
      setReferenceArray(referenceBlock)
    }
  }, [isOpen])

  return referenceArray.length ? (
    <>
      <Modal isOpen={isOpen} onAfterOpen={validateAll}>
        <ModalContainer>
          <ModalHeader> Reference Linking and Validataion </ModalHeader>
          <ModalBody>
            {referenceArray.map((element, index) => {
              return (
                <LabelContainer
                  isLast={index !== referenceArray.length - 1}
                  isLoading={element.status !== undefined}
                  isValidated={
                    element.isValidated != undefined && element.isValidated
                  }
                  key={index}
                  onClick={openValidatePopup}
                  refrence={element}
                />
              )
            })}
          </ModalBody>
          <ModalFooter>
            <CloseButton onClick={handleClose}>Close</CloseButton>
          </ModalFooter>
        </ModalContainer>
      </Modal>
      <ValidateModal
        isOpen={isValidateModalOpen}
        onClose={() => {
          SetValidateModalOpen(false)
        }}
        onValidate={onValidate}
        referenceText={referenceText}
        setReferenceVersion={ref => {
          // TODO: should this be onValidate?
          console.log('Version chosen: ', ref)
        }}
      />
    </>
  ) : null
}

export default RefModal
