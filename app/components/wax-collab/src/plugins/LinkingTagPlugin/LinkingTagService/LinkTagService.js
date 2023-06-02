import { Service } from 'wax-prosemirror-core'

const link = {
  attrs: {
    href: { default: null },
    rel: { default: '' },
    target: { default: 'blank' },
    title: { default: null },
    refId: { default: null },
    index: { default: null },
    class: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs(hook, next) {
        Object.assign(hook, {
          href: hook.dom.getAttribute('href'),
          title: hook.dom.getAttribute('title'),
          index: hook.dom.getAttribute('index'),
          class: hook.dom.getAttribute('class'),
        })
        next()
      },
    },
  ],
  toDOM(hook, next) {
    // eslint-disable-next-line no-param-reassign
    const { attrs } = hook.node
    attrs['data-refid'] = hook.node.attrs.refId ?? hook.node.attrs.href
    hook.value = ['a', attrs, 0]
    next()
  },
}

class LinkTagService extends Service {
  register() {
    document.addEventListener('click', function (event) {
      const collection = document.getElementsByTagName('figure')
      const figId = []

      for (let i = 0; i < collection.length; i++) {
        const ImageSrc = collection[i].getElementsByTagName('img')
        figId.push({
          refId: collection[i].getAttribute('id'),
          src: ImageSrc[0].getAttribute('src'),
        })
      }

      const customAttrValue = event.target.getAttribute('data-refid')
      const custAttrClass = event.target.getAttribute('class')

      if (custAttrClass === 'imageLinking') {
        const index = event.target.getAttribute('index')

        const figSrc = figId.filter(ele => {
          if (ele.src.split('%')[0] === index.split('%')[0]) {
            return ele
          }
        })

        document
          .getElementById(figSrc[0].refId)
          .scrollIntoView({ behavior: 'smooth' })
      } else if (customAttrValue && customAttrValue.length) {
        document
          .getElementById(customAttrValue)
          .scrollIntoView({ behavior: 'smooth' })
      }
    })
    const createMark = this.container.get('CreateMark')
    createMark(
      {
        test: link,
      },
      { toWaxSchema: true },
    )
  }
}

export default LinkTagService
