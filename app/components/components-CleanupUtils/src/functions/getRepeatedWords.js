const getRepeatedWords = (blockNodes) => {
    const repeatedWordsObj = [];
    const getcontentWithText = (blockNode) => {
        // const contents = blockNode?.node?.content?.content;
        // return contents.filter(content => content?.text);
        return blockNode?.node?.textContent;
    }
    blockNodes.forEach((blockNode, index) => {
        let textContents = getcontentWithText(blockNode);
        const blockNodePosition = blockNode?.pos;
        console.log('blockNodePosition: ', blockNodePosition);
        const words = textContents.split(" ");
        let wordPositionOffset = 1;
        let currentWordPosition = 0;
        words.forEach((word, i, wordsArr) => {
            const wordLen = word.length;
            const currentWordStartingPosition = wordLen + wordPositionOffset;
            const fromPosition = blockNodePosition + currentWordStartingPosition;
            const toPosition = fromPosition + (wordPositionOffset + wordLen);
            if (wordsArr[i + 1] === word) {
                const wordLen = word.length;
                const currentWordStartingPosition = currentWordPosition;
                const fromPosition = blockNodePosition + currentWordStartingPosition;
                const toPosition = fromPosition + (wordPositionOffset + wordLen)
                repeatedWordsObj.push({
                    'from': fromPosition,
                    'text': word,
                    'to': toPosition,
                    'replaceType': 'remove'
                })
            }
            currentWordPosition += word.length + 1;
        })
    });
    return repeatedWordsObj;
}

export default getRepeatedWords