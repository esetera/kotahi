const footNoteWrapperNode = {
  content: 'block+',
  group: 'block',
  marks: '',
  parseDOM: [{ tag: 'div.footnotewrapper' }],
  toDOM() {
    return ['div', { class: 'footnotewrapper' }, 0]
  },
}

export default footNoteWrapperNode
