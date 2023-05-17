const getRepeatedWords = blockNodes => {
  const repeatedWordsObj = []

  const getcontentWithText = blockNode => {
    // const contents = blockNode?.node?.content?.content;
    // return contents.filter(content => content?.text);
    return blockNode?.node?.textContent
  }

  blockNodes.forEach((blockNode, index) => {
    const textContents = getcontentWithText(blockNode)
    const blockNodePosition = blockNode?.pos
    console.log('blockNodePosition: ', blockNodePosition)
    const words = textContents.split(' ')
    const wordPositionOffset = 1
    let currentWordPosition = 0
    words.forEach((word, i, wordsArr) => {
      let wordLen = word.length
      let currentWordStartingPosition = wordLen + wordPositionOffset
      let fromPosition = blockNodePosition + currentWordStartingPosition
      let toPosition = fromPosition + (wordPositionOffset + wordLen)

      if (wordsArr[i + 1] === word) {
        wordLen = word.length
        currentWordStartingPosition = currentWordPosition
        fromPosition = blockNodePosition + currentWordStartingPosition
        toPosition = fromPosition + (wordPositionOffset + wordLen)
        repeatedWordsObj.push({
          from: fromPosition,
          text: word,
          to: toPosition,
          replaceType: 'remove',
        })
      }

      currentWordPosition += word.length + 1
    })
  })
  return repeatedWordsObj
}

export default getRepeatedWords
