import { Mapping } from 'prosemirror-transform';
import {eachRight} from 'lodash'

const insertParaAll = (view, results) => {
    const {
      state: { tr },
    } = view;
    const map = new Mapping();
    eachRight(results, (range) => {
      let { to, from } = range;
      tr.insertText('', from, to + 1).replaceWith(
        from,
        to,
        view.state.schema.nodes.paragraph.create(),
      )
    });
    view.dispatch(tr);
  };

  export default insertParaAll;