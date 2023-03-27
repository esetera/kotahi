import { Mapping } from 'prosemirror-transform';
import {eachRight} from 'lodash'
import {removeNode} from '../trackChanges'


const removeMultipleBreakAll = (view, results) => {
    const {
      state: { tr },
    } = view;
    const map = new Mapping();
    eachRight(results, (range) => {
      let { to, from } = range;
      view.state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isBlock && node.attrs.class == 'paragraph' && node.textContent == '') {
          removeNode(tr, node, pos, map);
        }
      })
    });
    view.dispatch(tr);
  
  }

  export default removeMultipleBreakAll;