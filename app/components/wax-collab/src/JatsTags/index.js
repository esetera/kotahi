import { Service } from 'wax-prosemirror-services'
import MixedCitation from './MixedCitation'
import Appendix from './Appendix'
import AppendixHeader from './AppendixHeader'
import FrontMatter from './FrontMatter'
import RefList from './RefList'
import ReferenceHeader from './ReferenceHeader'
import Abstract from './Abstract'
import AcknowledgementsSection from './AcknowledgementSection'

// copied from here: https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-services/src/DisplayBlockLevel/HeadingService/HeadingService.js

class JatsTagsService extends Service {
  name = 'JatsTagsService'
  // boot() {}

  register() {
    // this shows the method passed to the production editor:
    console.log(this.config)
    //
    this.container.bind('MixedCitation').to(MixedCitation)
    this.container.bind('Appendix').to(Appendix)
    this.container.bind('AppendixHeader').to(AppendixHeader)
    // this.container.bind('RefList').to(RefList)
    this.container.bind('ReferenceHeader').to(ReferenceHeader)
    this.container.bind('FrontMatter').to(FrontMatter)
    this.container.bind('Abstract').to(Abstract)
    this.container.bind('AcknowledgementsSection').to(AcknowledgementsSection)
    this.container.bind('RefList').toDynamicValue(() => {
      return new RefList(this.config)
    })

    const createNode = this.container.get('CreateNode')
    createNode({
      mixedCitation: {
        content: 'inline*', // 'inline*', TODO: can this be 'inline+' if this is in a reflist?
        group: 'inline', // 'block',
        defining: true,
        inline: true,
        attrs: {
          class: { default: 'mixedcitation' },
        },
        parseDOM: [
          {
            tag: 'span.mixedcitation', // 'p.mixedcitation'
            getAttrs(hook, next) {
              Object.assign(hook, {
                // this conked out in FullWaxEditor so I adjusted
                class: hook?.dom?.getAttribute('class') || 'mixedcitation',
              })
              // this conked out in FullWaxEditor so I adjusted
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook, next) {
          // eslint-disable-next-line no-param-reassign
          hook.value = ['span', { class: 'mixedcitation' }]
          typeof next !== 'undefined' && next()
        },
      },
    })
    createNode({
      refList: {
        content: 'block+',
        // content: 'referenceHeader? mixedCitation*', // this was more specific
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'reflist' },
        },
        parseDOM: [
          {
            tag: 'section.reflist',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'reflist',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          // console.log(this)
          console.log('in toDom hook')
          console.log(hook.content, hook.content.content)

          if (hook?.content?.content.length) {
            const plainText = hook.content.content
              .map(node => node.textContent) // does this need to be done recursively?
              .join('\n')

            console.log('Plaintext: ', plainText)
          }

          // TODO: make an array of all block-level elements in hook.content, then take TextNodes out of them, concat, send to anyStyle
          // probably need to remake the HTML as nodes? How do we do that?
          const attrs = { class: hook.node?.attrs?.class || 'reflist' }
          return ['section', attrs, 0]
        },
      },
    })
    createNode({
      referenceHeader: {
        content: 'inline*',
        group: 'block',
        priority: 0,
        defining: true,
        attrs: {
          class: { default: 'referenceheader' },
        },
        parseDOM: [
          {
            tag: 'h1.referenceheader',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'referenceheader',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'referenceheader' }
          return ['h1', attrs, 0]
        },
      },
    })
    createNode({
      appendix: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'appendix' },
        },
        parseDOM: [
          {
            tag: 'section.appendix',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'appendix',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'appendix' }
          return ['section', attrs, 0]
        },
      },
    })
    createNode({
      appendixHeader: {
        content: 'inline*',
        group: 'block',
        priority: 0,
        defining: true,
        attrs: {
          class: { default: 'appendixheader' },
        },
        parseDOM: [
          {
            tag: 'h1.appendixheader',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'appendixheader',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'appendixheader' }
          return ['h1', attrs, 0]
        },
      },
    })
    createNode({
      frontMatter: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'frontmatter' },
        },
        parseDOM: [
          {
            tag: 'section.frontmatter',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'frontmatter',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'frontmatter' }
          return ['section', attrs, 0]
        },
      },
    })
    createNode({
      abstractSection: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'abstractSection' },
        },
        parseDOM: [
          {
            tag: 'section.abstractSection',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'abstractSection',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'abstractSection' }
          return ['section', attrs, 0]
        },
      },
    })
    createNode({
      acknowledgementsSection: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'acknowledgementsSection' },
        },
        parseDOM: [
          {
            tag: 'section.acknowledgementsSection',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class:
                  hook?.dom?.getAttribute('class') || 'acknowledgementsSection',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = {
            class: hook.node?.attrs?.class || 'acknowledgementsSection',
          }

          return ['section', attrs, 0]
        },
      },
    })
  }
}

export default JatsTagsService
