import { v4 as uuidv4 } from 'uuid'

const figureNode = {
  content: 'image* figcaption{0,1}',
  group: 'block',
  marks: '',
  attrs: {
    refId: { default: '' },
    linked: { default: '' },
  },
  parseDOM: [
    {
      tag: 'figure',
      getAttrs(hook) {
        if (!hook.id) {
          return Object.assign(hook, {
            refId: uuidv4(),
          })
        }

        return Object.assign(hook, {
          refId: hook.id,
        })
      },
    },
  ],
  toDOM(hook, next) {
    let attrs

    if (hook.attrs.refId) {
      attrs = {
        id: hook.attrs.refId,
        linked: hook.attrs.linked,
      }
    } else {
      attrs = {
        id: uuidv4(),
        linked: hook.attrs.linked,
      }
    }

    // eslint-disable-next-line no-param-reassign
    return ['figure', attrs, 0]
  },
}

export default figureNode
