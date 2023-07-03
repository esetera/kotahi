const footNoteNode = {
  group: 'notes inline',
  content: 'footnotewrapper',
  inline: true,
  atom: true,
  attrs: {
    id: { default: '' },
  },
  toDOM: node => {
    return ['footnote', node.attrs]
  },
  parseDOM: [
    {
      tag: 'footnote',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id'),
        }
      },
    },
  ],
}

export default footNoteNode
