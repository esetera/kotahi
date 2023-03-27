import { Commands } from 'wax-prosemirror-utilities';

const insertPara = (view, range) => {
    const {
        state: { tr },
    } = view;
    let { to, from } = range;
    tr.insertText('', from, to + 1);
    view.dispatch(tr);
    Commands.simulateKey(view, 13, 'Enter');
}

export default insertPara;
