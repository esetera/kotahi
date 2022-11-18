const anystylemixedcitation = {
  attrs: {
    class: { default: 'anystyle-placeholder' },
  },
  group: 'citationMarks',
  excludes: 'citationMarks',
  parseDOM: [{ tag: 'span.anystyle-placeholder' }],
  toDOM() {
    console.log('anystyle placeholder todom fired!')
    return [
      'span',
      { class: 'anystyle-placeholder', title: 'Anystyle Placeholder' },
      0,
    ]
  },
}

export default anystylemixedcitation
