import React, { useState } from 'react'
import CardContent from './CardContent'
import { DataList } from './DataList'
import getWordsForGivenFilter from './functions/getWordsForGivenFilter'
import fixall from './functions/fixall'
import fix from './functions/fix'
import { onLocate } from './functions/documentHelper'
import Modal, { CloseButton, ModalBody, ModalContainer, ModalHeader, ModalFooter } from "./style"

const cardContentTypes = {
    FLTR: 'filter',
    FIX: 'fix',
    LOAD: 'load',
  }

export const CleanupUtilsModal = ({ view,isOpen, closeModal }) => {
    const [cardContentType, setCardContentType] = useState(cardContentTypes.FLTR)
    const [selectRule, setRules] = useState([])
    const [showFixButton, setShowFixButton] = useState(false)
    const [matchingWords, setMatchingWords] = useState([])
    const [focusedWord, setFocusedWord] = useState(null)

    const handleClose = () => {
        closeModal()
    }

    const handelingResettingCard = () => {
        setMatchingWords([])
        setRules([])
        setCardContentType(cardContentTypes.FLTR)
        handleClose()
      }

      const moveToFilter = () => {
        setMatchingWords([])
        setRules([])
        setCardContentType(cardContentTypes.FLTR)
      }
      
      const clearFousedWord = () => {
        setFocusedWord(null)
      }

    const getFilterObject = () => {
        let dataArr = []
        if (selectRule.length > 0) {
          const DataListArr = Object.entries(DataList)
          for (let [key, value] of DataListArr) {
            selectRule.map(item => {
              if (item.value.includes(key)) {
                let formValue = { ...item, ...value }
                dataArr = [...dataArr, formValue]
              }
            })
          }
        }
        return dataArr
      }

    const onCheckBoxChange = (val, description) => event => {
      
        if (val === 'FindImage') {
          setShowFixButton(true)
        } else {
          setShowFixButton(false)
        }
        if (event.target.checked) {
          setRules(oldArr => [...oldArr, { value: val, description: description }])
        } else {
          setRules(selectRule.filter(ele => ele.value !== val))
        }
      }

      const removedNonPatter = filters => {
        return filters.filter(filter => {
          if (filter?.main?.length > 0) return filter
        })
      }

      const moveCardToFix = words => {
        const filtersWords = removedNonPatter(words)
        setMatchingWords(filtersWords)
        setCardContentType(cardContentTypes.FIX)
      }

      const onRun = () => {
        const dataArr = getFilterObject()
        const newMatchingWords = getWordsForGivenFilter(dataArr, view)
        moveCardToFix(newMatchingWords)
      }
      
      const onFixAll = () => {
        const dataArr = getFilterObject()
        fixall(dataArr, view)
        handelingResettingCard()
      }

      const onFix = (filteredWord, viewId) => {
        fix(view, filteredWord, viewId)
        onRun()
      }

      const onLocateContent = (filteredWord, viewId) => {
        view['main'].focus()
        onLocate(view, viewId, filteredWord)
      }

      const onCancel = () => {
        if (cardContentTypes.FLTR === cardContentType) {
          handelingResettingCard()
        } else if (cardContentTypes.FIX === cardContentType) {
          moveToFilter()
          clearFousedWord()
        }
        // highLightWordsPlugin.props.setHighLightWords([])
        view['main'].focus()
      }

      const onWordToFocusChange = (collectionIndex, wordIndex) => {
        setFocusedWord({ collectionIndex, wordIndex })
      }

      const getNextWordAfterRemoval = (focusedWord, filteredList) => {
        const { collectionIndex = null, wordIndex = null } = focusedWord
        let newCollectionIdex = null,
          newWordIndex = null
        if (filteredList?.[collectionIndex]?.main) {
          const wordList = filteredList[collectionIndex].main
          newWordIndex = wordIndex
          newCollectionIdex = collectionIndex
        }
        return { collectionIndex: newCollectionIdex, wordIndex: newWordIndex }
      }
      

      const onFixAndLocate = () => {
        const { collectionIndex: currentCI, wordIndex: currentWI } = focusedWord
        const wordList = matchingWords
        const selctedWord = wordList?.[currentCI]?.main?.[currentWI]
        const dataArr = getFilterObject()
    
        // do fix here
        onFix(selctedWord, wordList)
    
        const newWordsList = getWordsForGivenFilter(dataArr, view)
        const filtersWords = removedNonPatter(newWordsList)
        const {
          collectionIndex: nxtCI,
          wordIndex: nxtWI,
        } = getNextWordAfterRemoval(focusedWord, filtersWords)
        const nxtSelctedWord = filtersWords?.[nxtCI]?.main?.[nxtWI]
        if (nxtSelctedWord === undefined || nxtSelctedWord === null) {
          return
        }
        // locate
        onLocateContent(nxtSelctedWord, filtersWords?.[nxtCI])
        //update the focus
        setMatchingWords(filtersWords)
        setFocusedWord({ collectionIndex: nxtCI, wordIndex: nxtWI })
      } 

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalContainer>
                    <ModalHeader> {'Cleanup Utils'} </ModalHeader>
                    <ModalBody>
                       <CardContent 
                       cardContentType={cardContentType}
                       onCheckBoxClick={onCheckBoxChange}
                       onRun={onRun}
                       onFixAll={onFixAll}
                       onFix={onFix}
                       onLocateContent={onLocateContent}
                       filteredWords={matchingWords}
                       onCancelClick={onCancel}
                       focusedWord={focusedWord}
                       setWordFocus={onWordToFocusChange}
                       onFixAndLocate={onFixAndLocate}
                       highlightAllWords={() => ''}
                       showFixButton={showFixButton}
                       cardContentTypes={cardContentTypes}
                       selectRule={selectRule}
                       />
                    </ModalBody>
                </ModalContainer>
            </Modal>
        </>
    )
}
