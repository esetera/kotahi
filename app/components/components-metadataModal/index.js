
import { SelectDropdown } from '@pubsweet/ui/dist/molecules'
import React from 'react'
import Modal, { ModalBody, ModalContainer, ModalHeader, ModalFooter, ModalButton, MessageString, RowContainer } from './style'


export const MetadataModal = ({
    isOpen,
    closeModal
}) => {

    const onSubmit = (event) => {
        console.log(event)
    }
    const calenerYearOptions = [
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
    ]

    const bookFormatOptions=[
        {value:'ebook',label:'EBOOK'},
        {value:'hardcover',label:'HARDCOVER'},
        {value:'papperbook',label:'PAPPERBOOK'}
    ]
    const copyrightOptions=[
        {value:'Mechanical Licence',label:'Mechanical Licence'},
        {value:'publish performing licence',label:'publish performing licence'},
        {value:'Reproduction licece',label:'Reproduction licece'},
        {value:'others',label:'OTHERS'}
    ]

    return (
        <Modal isOpen={isOpen}>
            <ModalContainer>
                <ModalHeader> <MessageString>BOOK METADATA</MessageString></ModalHeader>
                <ModalBody>
                    <RowContainer Title='Title' />
                    <RowContainer Title={'Sub Title'} />
                    <RowContainer Title={'Description'} IsTextArea={true} />
                    <RowContainer Title={'Subject'} IsTextArea={true} />
                    <RowContainer Title={'Price'} Type={'number'} />
                    <RowContainer Title={'ISBN (Source)'} />
                    <RowContainer Title={'ISBN (Identifier)'} />
                    <RowContainer Title={'Page count'} Type={'number'} />
                    <RowContainer Title={'License'} IsTextArea={true} />
                    <RowContainer Title={'Language'} />
                    <RowContainer Title={'Series'} />
                    <RowContainer Title={'Edition'} Type={'number'} />
                    <RowContainer Title={'Figure Count'} Type={'number'} />
                    <RowContainer Title={'Table count'} Type={'number'} />
                    <RowContainer Title={'Equation Count'} Type={'number'} />
                    <RowContainer Title={'Reference Count'} Type={'number'} />
                    <RowContainer Title={'Author'} />
                    <RowContainer Title={'Publisher'} />
                    <RowContainer Title={'Copyright Statement'} IsTextArea={true} />
                    <RowContainer Title={'Copyright Year'} Type={'DropDown'} options={calenerYearOptions} placeholder={'Select the Year'} isClearable={true}/>
                    <RowContainer Title={'Copyright Holder'} />
                    <RowContainer Title={'Copyright Text'} />
                    <RowContainer Title={'Copyright Type'} Type={'DropDown'} options={copyrightOptions} placeholder={'Select Type'} isClearable={true}/>
                    <RowContainer Title={'Copyright Link'} />
                    <RowContainer Title={'Publication date'} Type={'Date'} />
                    <RowContainer Title={'Book media/format'} Type={'DropDown'} options={bookFormatOptions} placeholder={'Select Book Media/Format'} isClearable={true}/>
                    <RowContainer Title={'Publication status'} />
                    <RowContainer Title={'BISAC Subject'} />
                    <RowContainer Title={'Sales Territory'} />
                    <RowContainer Title={'Book Weight'} />
                    <RowContainer Title={'Trim Size'} />
                    <RowContainer Title={'Table of Contents'} IsTextArea={true} />
                    <RowContainer Title={'Except'} />
                    <RowContainer Title={'Citations'} />
                    <RowContainer Title={'Title Relationship'} IsTextArea={true} />
                    <RowContainer Title={'Age & Grade ranges'} />
                    <RowContainer Title={'BISAC Merchandising Themes'} IsTextArea={true} />
                    <RowContainer Title={'ACK ID'} Type={'number'} />
                    <RowContainer Title={'Volume number'} Type={'number'} />
                    <RowContainer Title={'Volume identifier'} Type={'number'} />
                    <RowContainer Title={'Keywords'} />
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={onSubmit}>Save MetaData</ModalButton>
                    <ModalButton onClick={closeModal} >Cancel</ModalButton>
                </ModalFooter>
            </ModalContainer>
        </Modal>
    )
}
