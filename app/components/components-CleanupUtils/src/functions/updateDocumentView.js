import {
    findInlineNodes, removeMarkFromNode, removeAll,
    clearViewSelection, insertParaAll, removeMultipleBreakAll,
    replaceAll
} from './documentHelper'


const updateDocumentView = (filter, documentContent, view) => {
    const { type } = filter
    if (filter.replaceType === 'remove') {
        if (type === 'underline' || type === 'link') {
            const InlineNodes = findInlineNodes(view.main.state.doc);
            InlineNodes.forEach(inline => {
                inline.node.marks.forEach(mark => {
                    if (mark.type.name === type) {
                        removeMarkFromNode(view.main, inline, view.main.state.schema.marks[type])
                    }
                })
            });
        }
        else {
            Object.keys(documentContent).forEach((viewId) => {
                const singleView = view[viewId];
                removeAll(singleView, documentContent[viewId]);
                clearViewSelection(view, viewId);
            });
        }
    } else {
        Object.keys(documentContent).forEach((viewId) => {
            const singleView = view[viewId];
            if (documentContent[viewId][0]?.search == 'invisible--break') {
                insertParaAll(singleView, documentContent[viewId])
            } else if (documentContent[viewId][0]?.type == 'HardBreak') {
                removeMultipleBreakAll(singleView, documentContent[viewId]);
            } else {
                replaceAll(singleView, documentContent[viewId]);
            }
            clearViewSelection(view, viewId);
        });
    }
}

export default updateDocumentView;