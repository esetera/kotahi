import { Mapping } from 'prosemirror-transform';
import removeNode from './removeNode';
const removeMultipleBreak = (view, range) => {
    const {
        state: { tr },
    } = view;
    let { to, from } = range;
    const map = new Mapping();
    view.state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isBlock && node.attrs.class == 'paragraph' && node.textContent == '') {
            removeNode(tr, node, pos, map);
        }
    })
    view.dispatch(tr);
}

export default removeMultipleBreak;
