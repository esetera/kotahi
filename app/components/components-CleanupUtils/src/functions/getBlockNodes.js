import {findBlockNodes,findInlineNodes} from './documentHelper'

const getBlockNodes = (view) => {
    const allBlockNodes =
        findBlockNodes(view.main.state.doc);
    const inlineNodes =
        findInlineNodes(view.main.state.doc);
    return { allBlockNodes, inlineNodes }
}

export default getBlockNodes;
