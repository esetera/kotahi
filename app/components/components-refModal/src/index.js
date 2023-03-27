import Modal, { CloseButton, ModalBody, ModalContainer, LabelContainer, ModalHeader, ModalFooter } from "./style"
import React from 'react'
import { ValidateModal } from "../../components-validateModal/src"
import { useState } from "react"
import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_VALIDATION } from "../../../queries"


export const RefModal = ({ isOpen, closeModal }) => {
    const [isValidateModalOpen, SetValidateModalOpen] = useState(false)
    const [referenceText, setRefText] = useState([])
    const [referenceArray, setRefernceArray] = useState([])
    const [validatedText, setvalidatedText] = useState([])
    const axios = require('axios')
    const config = require('config')
    const { clientId, clientSecret, port, protocol, host } = config.pagedjs
    const serverUrl = `${protocol}://${host}${port ? `:${port}` : ''}`
    const [createReferenceValidation] = useMutation(UPDATE_VALIDATION)
    let Titles = [
        {
            id: 1,
            reference: 'Trying to style a modal in ReactJS and would like some help. Im facing difficulty in trying to center align the content modal. In addition, when styling the modal, is it possible to assign a className and style it in the css page'
        },
        {
            id: 2,
            reference: 'This book has been almost a decade in the making.'
        },
        {
            id: 3,
            reference: 'Article 2020: Immigrant Health-Care Workers in the United States,” Migration Policy Institute'
        },
        {
            id: 4,
            reference: 'Emmigrants are at the heart of healthcare in the United States. In 2018 alone, healthcare workers in the United States comprised 2.6 million immigrants, of which 314,000 were refugees'
        },
        {
            id: 5,
            reference: 'The connections between education and healthcare, the latter a thriving industry in the United States that has always relied on immigrants'
        }
    ]
    useEffect(() => {
        setRefernceArray(Titles)
    }, [])
    const openValidatePopup = (refrenceTexts) => {
        if (refrenceTexts.status !== undefined) {
            setRefText(refrenceTexts)
            SetValidateModalOpen(true)
        }
    }

    const getRefTextId = (refText) => {
        let id = -1;
        Titles.findIndex((ele) => {
            if (ele.text === refText) {
                id = ele.id
            }
        })
        return id;
    }
    const onValidate = async validateText => {
        const response = await createReferenceValidation({ variables: { reference: validateText } })
        if (response.data?.createReferenceValidation.succeeded) {
            const id = getRefTextId(validateText);
            setvalidatedText([...validatedText, id]);

        }
        SetValidateModalOpen(false)
    }
    const handleClose = () => {
        closeModal()
        setRefernceArray(Titles)
    }
    const getAxios = (newRef) => {
        const graphqlQuery = {
            "operationName": "getreferencevalidation",
            "query": "mutation getreferencevalidation($reference: String!) {\n  createReferenceValidation(reference: $reference) {\n  reference\n  responseData\n    succeeded\n    errorMessage\n    __typename\n  }\n}\n",
            "variables": {
            }
        };
        graphqlQuery.variables = { 'reference': `${newRef}` }
        return axios({
            url:  process.env.NODE_ENV==="development"?  'http://localhost:4000/graphql':serverUrl,
            method: 'post',
            data: graphqlQuery
        }).then((res) => res.data.data.createReferenceValidation != null ? res.data.data.createReferenceValidation : 'Error')
            .catch(() => { return 'Error' })
    }
    const isValidated = (responseData) => {

        const response = responseData.responseData && JSON.parse(responseData.responseData).items
        {
            response && response.map(ele => {
                if (responseData.reference.match(ele.DOI) && ele.DOI != undefined)
                    return true;
            })
        }
        return false
    }
    const validateAll = async () => {
        let axiosValue = []
        Titles.forEach((ele) => {
            axiosValue.push(getAxios(ele.reference))
        })
        Promise.all(axiosValue).then((result) => {
            let response = []
            result.forEach((element, index) => {
                element = element != 'Error' ? element : referenceArray[index]
                response.push({
                    index: `${index}`,
                    reference: `${element.reference}`,
                    response: `${element.responseData}`,
                    status: `${element.succeeded}`,
                    isValidated: isValidated(element)
                })
            });
            setRefernceArray(response);
        });
    }
    return (
        <>
            <Modal isOpen={isOpen} onAfterOpen={validateAll}>
                <ModalContainer>
                    <ModalHeader> {'Reference Linking and Validataion'} </ModalHeader>
                    <ModalBody>
                        {
                            referenceArray.map((element, index) => {
                                return (
                                    <LabelContainer refrence={element}
                                        onClick={openValidatePopup}
                                        isLast={index !== referenceArray.length - 1}
                                        isLoading={element.status !== undefined}
                                        isValidated={element.isValidated != undefined && element.isValidated}
                                    />
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter>
                        <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ModalFooter>
                </ModalContainer>
            </Modal>
            <ValidateModal
                isOpen={isValidateModalOpen}
                onClose={() => { SetValidateModalOpen(false) }}
                referenceText={referenceText}
                onValidate={onValidate}
            />
        </>
    )
}



