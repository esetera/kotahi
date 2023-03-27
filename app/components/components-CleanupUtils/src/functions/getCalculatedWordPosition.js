const getCalculatedWordPosition=(view,content)=>{
    const documentEndPosition = view.main.docView.size -1;
    const documentLastPositionOffset = -1;
    const documentCalculatedEndPosition = documentEndPosition + documentLastPositionOffset;
    const documentStartPosition = 0;

    let newPosition = {from: content.from-10,to:content.to+10};

    if(newPosition.from< documentStartPosition){
        newPosition.from =documentStartPosition;
    }

    if(newPosition.to > documentCalculatedEndPosition){
        newPosition.to = documentCalculatedEndPosition;
    }

    return newPosition;

}

export default getCalculatedWordPosition;