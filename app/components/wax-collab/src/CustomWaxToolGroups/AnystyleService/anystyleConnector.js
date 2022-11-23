import { v4 as uuidv4 } from 'uuid'

// NOTE: this is just the image placeholder!

// const findPlaceholder = (state, id, placeholderPlugin) => {
//   const decos = placeholderPlugin.getState(state)
//   const found = decos.find(null, null, spec => spec.id === id)
//   return found.length ? found[0].from : null
// }

const anystyleConnector = async (
  view,
  sendToAnystyle,
  placeholderPlugin,
  context,
) => {
  console.log('in anystyle connector')
  return true
  const { state } = view

  // A fresh object to act as the ID for this upload
  const id = {}

  // Replace the selection with a placeholder
  const { tr } = state
  if (!tr.selection.empty) tr.deleteSelection()

  tr.setMeta(placeholderPlugin, {
    add: { id, pos: tr.selection.from },
  })

  view.dispatch(tr)
  const text = 'This is my text'
  console.log(view)
  const htmlBack = await sendToAnystyle(text)

  // Otherwise, insert it at the placeholder's position, and remove
  // the placeholder
  // view.dispatch(
  //   state.tr
  //     .replaceWith(
  //       pos,
  //       pos,
  //       // view.state.schema.nodes.image.create({
  //       //   src: url,
  //       // }),
  //       view.state.schema.nodes.image.create({
  //         src: url,
  //         id: uuidv4(),
  //       }),
  //     )
  //     .setMeta(placeholderPlugin, { remove: { id } }),
  // )

  if (htmlBack === '') {
    // On failure, just clean up the placeholder
    view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }))
  }
}

export default anystyleConnector
