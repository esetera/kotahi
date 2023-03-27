import { TextSelection } from "prosemirror-state";

const clearViewSelection = (view, lastActiveViewId) => {
    view[lastActiveViewId].dispatch(
      view[lastActiveViewId].state.tr.setSelection(
        TextSelection.create(view[lastActiveViewId].state.doc, 0)
      )
    );
  };

export default clearViewSelection