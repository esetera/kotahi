import { Service } from 'wax-prosemirror-core'
import { v4 as uuidv4 } from 'uuid'
import Reference from './RefCitationTool'

// TODO: In ../index.js, this is defined as a block. It's not going to work in footnotes; I think we might need to modify our existing MixedCitationSpan to work like this?
// TODO: This doesn't currently come out as JATS.
// TODO: make this include the original text as an attribute (data-original-text) when created.

const refNode = {
  content: 'inline*',
  group: 'block',
  priority: 0,
  defining: true,
  attrs: {
    class: { default: 'ref' },
    refId: { default: '' },
    valid: { default: false },
    needsReview: { default: false },
    needsValidation: { default: true },
    structure: { default: '{}' },
  },
  parseDOM: [
    {
      tag: 'p.ref',
      getAttrs(hook, next) {
        Object.assign(hook, {
          class: hook?.dom?.getAttribute('class'),
          refId: hook?.dom?.getAttribute('id'),
          valid: hook?.dom?.getAttribute('data-valid') === 'true',
          needsValidation: hook?.dom?.getAttribute('data-needs-validation')
            ? hook?.dom?.getAttribute('data-needs-validation') === 'true'
            : true,
          needsReview: hook?.dom?.getAttribute('data-needs-review') === 'true',
          structure: JSON.parse(
            hook?.dom?.getAttribute('data-structure') || '{}',
          ),
        })
        typeof next !== 'undefined' && next()
      },
    },
  ],
  toDOM(hook, next) {
    const uuid = uuidv4()

    const attrs = {
      class: hook?.node?.attrs?.class,
      'data-valid': hook?.node?.attrs?.valid,
      'data-needs-validation': hook?.node?.attrs?.needsValidation,
      'data-needs-review': hook?.node?.attrs?.needsReview,
      id: hook?.node?.attrs?.refId,
    }

    if (hook?.node?.attrs?.structure) {
      attrs['data-structure'] = JSON.stringify(hook?.node?.attrs?.structure)
    }

    if (!hook?.node?.attrs?.refId) {
      hook.node.attrs.refId = uuid
      attrs.id = uuid
    }

    hook.value = ['p', attrs, 0]
    next()
  },
}

class RefService extends Service {
  // name = 'RefService'

  boot() {}

  register() {
    this.container.bind('Reference').to(Reference)
    const createNode = this.container.get('CreateNode')
    createNode(
      {
        reference: refNode,
      },
      { toWaxSchema: true },
    )
  }
}

export default RefService
