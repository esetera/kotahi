import {
  FooterButton,
  LoaderText,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "./styles";
import React from "react";
import { useState } from "react";
import Modal, { RowContainer } from "./components";

const ValidateModal = ({ ...props }) => {
  const [apiCall, setApiCall] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [refData, setRefData] = useState([]);

  const handleClose = () => {
    props.onClose();
    onReferenceSelected(-1);
    setApiCall(false);
  };
  const onReferenceSelected = (dataIndex) => {
    setSelectedIndex(dataIndex);
  };
  const onValidate = () => {
    setApiCall(false);
    onReferenceSelected(-1);
    props.onValidate(props.referenceText, true);
  };
  const ModalOpened = () => {
    if (props.referenceText.response !== "undefined")
      setRefData(JSON.parse(props.referenceText.response).items);
    else setApiCall(true);
  };
  return (
    <Modal isOpen={props.isOpen} onAfterOpen={ModalOpened}>
      <ModalContainer>
        <ModalHeader>Reference Validation</ModalHeader>
        <ModalBody>
          <div>{props?.referenceText}</div>
          {props.refBlock?.length > 0 ? (
            props.refBlock?.map((elem, index) => {
              return (
                <RowContainer
                  index={index}
                  title={elem}
                  onClick={onReferenceSelected}
                  isSelected={selectedIndex === index}
                />
              );
            })
          ) : (
            <>
              {" "}
              {apiCall && (
                <LoaderText>
                  Reference Validation failed, Please try again after sometime
                  ...
                </LoaderText>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <FooterButton
            disabled={selectedIndex === -1}
            onClick={() => onValidate()}
          >
            Done
          </FooterButton>
          <FooterButton onClick={handleClose}>Close</FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default ValidateModal;
