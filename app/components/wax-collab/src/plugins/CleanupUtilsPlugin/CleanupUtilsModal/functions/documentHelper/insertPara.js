import { Commands } from 'wax-prosemirror-core'

const insertPara = (view, range) => {
  const {
    state: { tr },
  } = view

  const { to, from } = range
  tr.insertText('', from, to + 1)
  view.dispatch(tr)
  Commands.simulateKey(view, 13, 'Enter')
}

export default insertPara
