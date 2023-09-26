const referenceWrapper = {
  content: 'reference*',
  group: 'block',
  attrs: {},
  parseDOM: [
    {
      tag: 'p.refwrapper',
    },
  ],
  toDOM() {
    return ['p', { class: 'refwrapper' }, 0]
  },
}

export default referenceWrapper
