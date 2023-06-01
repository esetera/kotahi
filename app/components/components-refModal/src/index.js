import Modal, {
  CloseButton,
  ModalBody,
  ModalContainer,
  ReferenceContainer,
  ModalHeader,
  ModalFooter,
} from "./style";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { WaxContext, DocumentHelpers } from "wax-prosemirror-core";
import { LinkingsNotFound } from "../../components-notFound/src";

export const RefModal = ({ isOpen, closeModal }) => {
  const [waxRefBlocks, setWaxRefBlocks] = useState([]);
  const concurrentValidations = 2;
  const {
    pmViews: { main },
  } = useContext(WaxContext);

  useEffect(() => {
    if (!isOpen) return;

    const referenceBlocks = DocumentHelpers.findBlockNodes(main.state.doc)
      .filter((block) => {
        const {
          node: {
            isBlock,
            attrs: { class: klass },
          },
        } = block;

        return isBlock && (klass === "ref-tx" || klass === "ref");
      })
      .map((referenceBlock) => {
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
        } = referenceBlock;
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
        };
      });

    setWaxRefBlocks(referenceBlocks);
  }, [isOpen]);

  const persistReference = (refBlock) => {
    const allNodes = DocumentHelpers.findBlockNodes(main.state.doc);
    const refNode = allNodes.find((node) => {
      const {
        node: {
          attrs: { refId },
        },
      } = node;
      return refId == refBlock.dataId;
    });
    const { valid, needsReview, structure, needsValidation } = refBlock;
    const attrs = {
      ...refNode.node.attrs,
      valid,
      needsReview,
      needsValidation,
      structure,
    };
    const tr = main.state.tr.setNodeMarkup(refNode.pos, undefined, attrs);
    main.dispatch(tr);
  };

  const handleClose = () => {
    closeModal();
  };

  const findMostRelaventReference = (matchingReferences, referenceText) => {
    const matchesTitle = (ref) => referenceText.includes(ref.title);
    const matchesFirstAuthor = (ref) => {
      let firstAuthor = ref?.author?.find(
        (author) => author.sequence === "first"
      );
      return (
        referenceText.includes(firstAuthor?.family) ||
        referenceText.includes(firstAuthor?.given)
      );
    };
    const matchesJournalTitle = (ref) =>
      referenceText.includes(ref.journalTitle);
    const matchesPage = (ref) => {
      return (
        referenceText.includes(ref.page) ||
        referenceText.includes(ref.page?.replace("-", "\u2013")) ||
        referenceText.includes(ref.page?.replace("-", "\u2014"))
      );
    };
    const matchesIssue = (ref) => referenceText.includes(ref.issue);
    const matchesVolume = (ref) => referenceText.includes(ref.volume);

    return matchingReferences.find((reference) => {
      return (
        matchesTitle(reference) &&
        matchesFirstAuthor(reference) &&
        (matchesJournalTitle(reference) ||
          matchesPage(reference) ||
          matchesIssue(reference) ||
          matchesVolume(reference))
      );
    });
  };

  // Kick off initial set of validations. The rest will continue as each gets completed.
  const intiateValidation = () => {
    waxRefBlocks
      .filter((refBlock) => refBlock.needsValidation)
      .slice(0, concurrentValidations)
      .forEach((refBlock) => {
        refBlock.validate = true;
      });
  };

  const onRefValidate = ({ refId, data, match, text }) => {
    const refBlock = waxRefBlocks.find((refBlock) => refBlock.dataId === refId);
    if (refBlock) {
      if (match === "multiple") {
        const refMatch = findMostRelaventReference(data, text);
        refBlock.structure = refMatch || data;
        refBlock.valid = refMatch ? true : false;
      } else {
        refBlock.structure = data;
        refBlock.valid = true;
      }

      // We don't need another CrossRef check
      refBlock.needsValidation = false;

      // Needs human review only for references with multiple matches
      refBlock.needsReview = Array.isArray(refBlock.structure);

      // Save the data to HTML
      persistReference(refBlock);

      // Initiate the next reference for validation
      const unvalidatedRefBlock = waxRefBlocks.find(
        (refBlock) => refBlock.needsValidation
      );
      if (unvalidatedRefBlock) unvalidatedRefBlock.validate = true;

      setWaxRefBlocks([...waxRefBlocks]);
    }
  };

  const onError = () => {};

  const renderReferences = () => {
    if (waxRefBlocks.length === 0) {
      return <LinkingsNotFound text={"No references found!"} />;
    }
    return waxRefBlocks.map(
      ({ text, validate, valid, dataId, needsReview, structure }, index) => {
        return (
          <ReferenceContainer
            text={text}
            key={index}
            validate={validate}
            valid={valid}
            refId={dataId}
            needsReview={needsReview}
            onValidate={onRefValidate}
            onError={onError}
            structure={structure}
          />
        );
      }
    );
  };

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
  );
};
