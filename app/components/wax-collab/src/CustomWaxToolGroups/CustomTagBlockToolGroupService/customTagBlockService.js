import { Service } from 'wax-prosemirror-services'
import CustomTagBlockTool from './CustomTagBlockTool'

const customBlockNode = {
  content: 'inline*',
  group: 'block',
  priority: 0,
  defining: true,
  attrs: {
    id: { default: '' },
    class: { default: '' },
    type: { default: 'block' },
    refId: { default: '' },
    valid: { default: 'false' },
    structure: { default: 'false' },
    linked: { default: 'false' },
    tableLinked: { default: 'false' },
    imageLinked: { default: 'false' },
  },
  parseDOM: [
    {
      tag: 'p[data-type="block"]',
      getAttrs(hook, next) {
        if (hook.dom.dataset.id) {
          Object.assign(hook, {
            class: hook.dom.getAttribute('class'),
            type: hook.dom.dataset.type,
            refId: hook.dom.getAttribute('id')
              ? hook.dom.getAttribute('id')
              : hook.dom.dataset.id,
            valid: hook.dom.dataset.valid,
            structure: hook.dom.dataset.structure,
            linked: hook.dom.dataset.linked,
            tableLinked: hook.dom.dataset.tableLinked,
            imageLinked: hook.dom.dataset.imageLinked,
          })
        } else if (hook.dom.id) {
          Object.assign(hook, {
            class: hook.dom.getAttribute('class'),
            type: hook.dom.dataset.type,
            refId: hook.dom.getAttribute('id')
              ? hook.dom.getAttribute('id')
              : hook.dom.dataset.id,
            valid: hook.dom.dataset.valid,
            structure: hook.dom.dataset.structure,
            linked: hook.dom.dataset.linked,
            tableLinked: hook.dom.dataset.tableLinked,
            imageLinked: hook.dom.dataset.imageLinked,
          })
        } else {
          Object.assign(hook, {
            class: hook.dom.getAttribute('class'),
            type: hook.dom.dataset.type,
            valid: hook.dom.dataset.valid,
            structure: hook.dom.dataset.structure,
            linked: hook.dom.dataset.linked,
            tableLinked: hook.dom.dataset.tableLinked,
            imageLinked: hook.dom.dataset.imageLinked,
            refId: hook.dom.getAttribute('id'),
          })
        }
        next()
      },
    },
  ],
  toDOM(hook, next) {
    let attrs
    if (hook.node.attrs.refId) {
      attrs = {
        class: hook.node.attrs.class,
        'data-type': hook.node.attrs.type,
        'data-valid': hook.node.attrs.valid,
        'data-linked': hook.node.attrs.linked,
        'data-tableLinked': hook.node.attrs.tableLinked,
        'data-imageLinked': hook.node.attrs.imageLinked,
        'data-structure': hook.node.attrs.structure,
        id: hook.node.attrs.refId,
      }
    } else {
      attrs = {
        class: hook.node.attrs.class,
        'data-type': hook.node.attrs.type,
        'data-valid': hook.node.attrs.valid,
        'data-structure': hook.node.attrs.structure,
        'data-linked': hook.node.attrs.linked,
        'data-tableLinked': hook.node.attrs.tableLinked,
        'data-imageLinked': hook.node.attrs.imageLinked,
      }
      if (hook.node.attrs.id) {
        attrs = { ...attrs, id: hook.node.attrs.id }
      }
    }

    // eslint-disable-next-line no-param-reassign
    hook.value = ['p', attrs, 0]
    next()
  },
}

class CustomTagBlockService extends Service {
  register() {
    this.container.bind('CustomTagBlockTool').to(CustomTagBlockTool)
    const createNode = this.container.get('CreateNode')
    createNode(
      {
        customTagBlock: customBlockNode,
      },
      { toWaxSchema: true },
    )
  }
}

export default CustomTagBlockService
