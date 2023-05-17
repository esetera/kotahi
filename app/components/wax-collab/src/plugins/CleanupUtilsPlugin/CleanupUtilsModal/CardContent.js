import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'
import { removeList, provideList, replaceList } from './DescriptionList'

const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const FixCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`

const Wrapper = styled.div`
  overflow-y: auto;
  height: 90%;
  padding: 0px 10px;
`

const Rules = styled.div``

const Rule = styled.div`
  padding: 5px 0;
`

const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 10%;
  padding: 0px 10px 15px;
  align-items: flex-end;
  justify-content: flex-end;
`

const ButtonRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 10px;

  & button {
    color: white;
    background: #525e76;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    line-height: 1.5715;
    width: 100%;
    border: 1px solid transparent;
    min-height: 32px;
    padding: 4px 15px;
    border-radius: 2px;
    white-space: nowrap;
  }
`

const WrapperResult = styled.div`
  overflow-y: auto;
  height: 85%;

  & div {
    padding-right: 0px;
  }
`

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  background: ${props => (props.isFocused ? '#D9DDDC' : 'transparent')};
`

const NoContent = styled.div`
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #eee;
  border-radius: 10px;
`

const totalList = removeList.concat(provideList).concat(replaceList)

const FilterCardContent = ({
  onCheckBoxClick,
  onRunClick,
  onCancel,
  selectRule,
}) => {
  const isRunDisabled = !(selectRule?.length > 0)
  console.log(selectRule)
  return (
    <FilterContent>
      <Wrapper>
        <Rules>
          {totalList.map(item => (
            <Rule key={item.value}>
              <label className="rules">
                <input
                  onChange={onCheckBoxClick(item.value, item.description)}
                  type="checkbox"
                />
                &nbsp;
                <span value={item.value}>{item.description}</span>
              </label>
            </Rule>
          ))}
        </Rules>
      </Wrapper>
      <ButtonGroupContainer>
        <ButtonRowContainer>
          <Button
            disabled={isRunDisabled}
            label="Run"
            onClick={onRunClick}
            title="Run"
          />
          <Button label="Close" onClick={onCancel} title="Close" />
        </ButtonRowContainer>
      </ButtonGroupContainer>
    </FilterContent>
  )
}

const FixCardContent = ({
  highlightAllWords,
  fixAndLocate,
  filteredList,
  focusedWord,
  focusOnWord,
  onFixAllClick,
  onCancel,
  onFixClick,
  onLocateClick,
  showFixButton,
}) => {
  const checkFilterHasData = filterList => {
    for (const filter of filterList) {
      const words = filter?.main
      if (words?.length > 0) return true
    }

    return false
  }

  const noWordMatched = !checkFilterHasData(filteredList)

  const checkIsFocused = (filteredWordsIndex, wordIndex) => {
    if (
      filteredWordsIndex === focusedWord?.collectionIndex &&
      wordIndex === focusedWord?.wordIndex
    ) {
      return true
    }

    return false
  }

  const locateWord = (collectionIndex, wordIndex) => {
    const nextfilteredWordCollection = filteredList?.[collectionIndex] || null
    const wordToLocate = nextfilteredWordCollection?.main?.[wordIndex] || null

    // focusing only when collection and word are available.
    if (wordToLocate) {
      onLocateClick(wordToLocate, nextfilteredWordCollection)
      return true
    }

    return false
  }

  const focusNextWord = (collectionIndex, wordIndex) => {
    focusOnWord(collectionIndex, wordIndex)
  }

  const handelLocateNextWord = () => {
    const { collectionIndex, wordIndex } = getNextWordIndex(
      focusedWord,
      filteredList,
    )

    const ableTolocate = locateWord(collectionIndex, wordIndex)

    if (ableTolocate) {
      focusNextWord(collectionIndex, wordIndex)
    }
  }

  const handelFixAndMove = () => {
    // to impliment
    fixAndLocate()
  }

  const handelFocusPrevWord = () => {
    const { collectionIndex, wordIndex } = getPreviousWordIndex(
      focusedWord,
      filteredList,
    )

    const ableTolocate = locateWord(collectionIndex, wordIndex)

    if (ableTolocate) {
      focusNextWord(collectionIndex, wordIndex)
    }
  }

  const getWordId = word => {
    if (word === undefined || word === null) return null
    const wordId = `${word.from}-${word.to}`
    return wordId
  }

  const getCompnent = () => {
    return filteredList.map((filteredWords, filteredWordsIndex) => {
      return (
        <>
          <h4>{filteredWords?.main[0].description}</h4>
          {filteredWords?.main[0].from && filteredWords?.main.length > 0 ? (
            filteredWords?.main.map((word, wordIndex) => {
              const currentWordId = getWordId(word)

              const handelFix = () =>
                (() => {
                  onFixClick(word, filteredWords)
                  focusOnWord(filteredWordsIndex, wordIndex)
                })()

              const handelLocate = () =>
                (() => {
                  onLocateClick(word, filteredWords)
                  focusOnWord(filteredWordsIndex, wordIndex)
                })()

              return (
                <>
                  {word.text.trim() !== '' && (
                    <ListWrapper
                      isFocused={checkIsFocused(filteredWordsIndex, wordIndex)}
                      key={currentWordId}
                      onClick={handelLocate}
                    >
                      {/* {word.text.trim() === "" ? "" : word.text} */}
                      {word.text}
                      <ButtonGroupContainer>
                        <ButtonRowContainer>
                          {word.text.trim() !== '' && showFixButton ? null : (
                            <Button
                              className="mr-2"
                              label="Fix"
                              onClick={handelFix}
                              title="Fix"
                            />
                          )}
                        </ButtonRowContainer>
                      </ButtonGroupContainer>
                    </ListWrapper>
                  )}
                </>
              )
            })
          ) : (
            <NoContent>
              <p>NO OCCURRENCE</p>
            </NoContent>
          )}
        </>
      )
    })
  }

  return (
    <FixCardContainer>
      <Wrapper>
        <WrapperResult>
          <Rules>{getCompnent()}</Rules>
        </WrapperResult>
      </Wrapper>
      <ButtonGroupContainer>
        <ButtonRowContainer>
          <Button
            label="Ignore & Move Next"
            onClick={handelLocateNextWord}
            title="ignMoveNxt"
          />
          <Button
            disabled={showFixButton}
            label="Fix & Move Next"
            onClick={handelFixAndMove}
            title="fixMoveNxt"
          />
          <Button
            label="Previous"
            onClick={handelFocusPrevWord}
            title="previous"
          />
        </ButtonRowContainer>
        <ButtonRowContainer>
          <Button
            label="Show All"
            onClick={highlightAllWords}
            title="show_all"
          />
        </ButtonRowContainer>
        <ButtonRowContainer>
          <Button
            disabled={noWordMatched}
            label="Fix All"
            onClick={onFixAllClick}
            title="fixAll"
          />
          <Button label="Back" onClick={onCancel} title="Back" />
        </ButtonRowContainer>
      </ButtonGroupContainer>
    </FixCardContainer>
  )
}

const CardContents = ({
  highlightAllWords,
  cardContentType,
  onCheckBoxClick,
  onRun,
  onFix,
  onFixAll,
  onLocateContent,
  filteredWords,
  onCancelClick,
  focusedWord,
  setWordFocus,
  onFixAndLocate,
  showFixButton,
  cardContentTypes,
  selectRule,
}) => {
  if (cardContentType === cardContentTypes.FLTR)
    return (
      <FilterCardContent
        onCancel={onCancelClick}
        onCheckBoxClick={onCheckBoxClick}
        onRunClick={onRun}
        selectRule={selectRule}
      />
    )
  if (cardContentType === cardContentTypes.FIX)
    return (
      <FixCardContent
        filteredList={filteredWords}
        fixAndLocate={onFixAndLocate}
        focusedWord={focusedWord}
        focusOnWord={setWordFocus}
        highlightAllWords={highlightAllWords}
        onCancel={onCancelClick}
        onFixAllClick={onFixAll}
        onFixClick={onFix}
        onLocateClick={onLocateContent}
        showFixButton={showFixButton}
      />
    )
}

export default CardContents
