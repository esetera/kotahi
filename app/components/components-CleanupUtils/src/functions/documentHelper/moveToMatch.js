import { TextSelection } from "prosemirror-state";

const moveToMatch = (view, lastActiveViewId, from, to) => {
    const selectionFrom = new TextSelection(view[lastActiveViewId].state.doc.resolve(from));

    const selectionTo = new TextSelection(view[lastActiveViewId].state.doc.resolve(to));

    view[lastActiveViewId].dispatch(
        view[lastActiveViewId].state.tr.setSelection(
            TextSelection.between(selectionFrom.$anchor, selectionTo.$head)
        )
    );

    view[lastActiveViewId].dispatch(
        view[lastActiveViewId].state.tr.scrollIntoView()
    );
};

export default moveToMatch;
