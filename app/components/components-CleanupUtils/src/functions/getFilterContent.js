import getBlockNodes from './getBlockNodes'
import getRepeatedWords from './getRepeatedWords'
import getUnderLinedAndLinkNode from './getUnderLinedAndLinkNode'
import getFigureNodes from './getFigureNodes'
import getHardBreakNodes from './getHardBreakNodes'
import getOtherNodes from './getOtherNodes'

const getFilterContent = (filterObj, view) => {

    const { allBlockNodes, inlineNodes } = getBlockNodes(view)
    let filteredContent = [];
    const { replaceType, type, tag } = filterObj;
    if (replaceType == 'remove') {
        if (type == 'repeated-word') {
            filteredContent = getRepeatedWords(allBlockNodes);
        }
        else if (type == 'underline' || type == 'link') {
            filteredContent = getUnderLinedAndLinkNode(inlineNodes, type);
        }
        else if (type == 'figure') {
            filteredContent = getFigureNodes(allBlockNodes);
        }
        else if (type == 'HardBreak') {
            filteredContent = getHardBreakNodes(allBlockNodes, 'remove');
        }
        else {
            filteredContent = getOtherNodes(filterObj, view)
        }
    }
    else {
        if (type === 'HardBreak') {
            filteredContent = getHardBreakNodes(allBlockNodes, replaceType);
        } else if (tag === 'sup') {
            filteredContent = getOtherNodes(filterObj, view, tag)
        } else {
            filteredContent = getOtherNodes(filterObj, view)
        }
    }
    if(filteredContent.length === 0){
        filteredContent=[filterObj];
    }
    return { main: filteredContent }
}

export default getFilterContent;