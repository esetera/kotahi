import { Service } from 'wax-prosemirror-services'
import Ack from './Ack'
import BM from './Bm'
import Book from './Book'
import Box from './Box'
import Chap from './Chap'
import Chronology from './Chronology'
import Cpy from './Cpy'
import Ded from './Ded'
import Deq from './Deq'
import DiaGroup from './DiaGroup'
import EnGroup from './Engroup'
import Extract from './Extract'
import Fig from './Fig'
import FM from './Fm'
import FnGroup from './FnGroup'
import Frwd from './Frwd'
import Gly from './Gly'
import Idx from './Idx'
import Meta from './Meta'
import OrderedList from './OrderedList'
import Part from './Part'
import Pref from './Pref'
import Poem from './Poem'
import PrimaryDocument from './PrimaryDocument'
import Quo from './Quo'
import Ref from './Ref'
import Stanza from './Stanza'
import TableFnGroup from './TableFnGroup'
import TableWrap from './TableWrap'
import Toc from './Toc'
import TocIllustrations from './TocIllustrations'
import UnorderedList from './UnorderedList'
import SeriesPage from './SeriesPage'
import AppGroup from './AppGroup'
import TermSec from './TermSec'
import Abs from './Abs'
import Intro from './Intro'
import IglNote from './IglNote'
import InlineBox from './InlineBox'
import BHead from './BHead'
import CHead from './CHead'

class AnnotationTagsService extends Service {
  // boot() {}

  register() {
    this.container.bind('Ack').to(Ack)
    this.container.bind('BM').to(BM)
    this.container.bind('Book').to(Book)
    this.container.bind('Box').to(Box)
    this.container.bind('Chap').to(Chap)
    this.container.bind('Chronology').to(Chronology)
    this.container.bind('Cpy').to(Cpy)
    this.container.bind('Ded').to(Ded)
    this.container.bind('Deq').to(Deq)
    this.container.bind('DiaGroup').to(DiaGroup)
    this.container.bind('EnGroup').to(EnGroup)
    this.container.bind('Extract').to(Extract)
    this.container.bind('Fig').to(Fig)
    this.container.bind('FM').to(FM)
    this.container.bind('FnGroup').to(FnGroup)
    this.container.bind('Frwd').to(Frwd)
    this.container.bind('Gly').to(Gly)
    this.container.bind('Idx').to(Idx)
    this.container.bind('Meta').to(Meta)
    this.container.bind('OL').to(OrderedList)
    this.container.bind('Part').to(Part)
    this.container.bind('Poem').to(Poem)
    this.container.bind('Pref').to(Pref)
    this.container.bind('PrimaryDocument').to(PrimaryDocument)
    this.container.bind('Quo').to(Quo)
    this.container.bind('Ref').to(Ref)
    this.container.bind('Stanza').to(Stanza)
    this.container.bind('SeriesPage').to(SeriesPage)
    this.container.bind('TableWrap').to(TableWrap)
    this.container.bind('TableFnGroup').to(TableFnGroup)
    this.container.bind('Toc').to(Toc)
    this.container.bind('TocIllustrations').to(TocIllustrations)
    this.container.bind('UL').to(UnorderedList)
    this.container.bind('AppGroup').to(AppGroup)
    this.container.bind('Arr').to(Array)
    this.container.bind('Intro').to(Intro)
    this.container.bind('TermSec').to(TermSec)
    this.container.bind('Abs').to(Abs)
    this.container.bind('InlineBox').to(InlineBox)
    this.container.bind('IglNote').to(IglNote)
    this.container.bind('BHead').to(BHead)
    this.container.bind('CHead').to(CHead)

    const createNode = this.container.get('CreateNode')

    createNode({
      chronology: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'chronology' },
        },
        parseDOM: [
          {
            tag: 'div.chronology',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'chronology',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'chronology' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      ack: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'ack' },
        },
        parseDOM: [
          {
            tag: 'div.ack',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'ack',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'ack' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      box: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'box' },
        },
        parseDOM: [
          {
            tag: 'div.box',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'box',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'box' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      chap: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'chap' },
        },
        parseDOM: [
          {
            tag: 'div.chap',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'chap',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'chap' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      book: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'book' },
        },
        parseDOM: [
          {
            tag: 'div.ack',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'book',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'book' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      cpy: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'cpy' },
        },
        parseDOM: [
          {
            tag: 'div.cpy',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'cpy',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'cpy' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      ded: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'ded' },
        },
        parseDOM: [
          {
            tag: 'div.ded',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'ded',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'ded' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      deq: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'deq' },
        },
        parseDOM: [
          {
            tag: 'div.deq',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'deq',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'deq' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      bm: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'bm' },
        },
        parseDOM: [
          {
            tag: 'div.bm',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'bm',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'bm' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      diaGroup: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'diagroup' },
        },
        parseDOM: [
          {
            tag: 'div.diagroup',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'diagroup',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'diagroup' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      enGroup: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'engroup' },
        },
        parseDOM: [
          {
            tag: 'div.engroup',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'engroup',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'engroup' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      extract: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'extract' },
        },
        parseDOM: [
          {
            tag: 'div.extract',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'extract',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'extract' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      fig: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'fig' },
        },
        parseDOM: [
          {
            tag: 'div.fig',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'fig',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'fig' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      fm: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'fm' },
        },
        parseDOM: [
          {
            tag: 'div.fm',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'fm',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'fm' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      fnGroup: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'fnGroup' },
        },
        parseDOM: [
          {
            tag: 'div.fnGroup',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'fnGroup',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'fnGroup' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      frwd: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'frwd' },
        },
        parseDOM: [
          {
            tag: 'div.frwd',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'frwd',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'frwd' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      gly: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'gly' },
        },
        parseDOM: [
          {
            tag: 'div.gly',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'gly',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'gly' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      idx: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'idx' },
        },
        parseDOM: [
          {
            tag: 'div.idx',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'idx',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'idx' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      iglNote: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'iglNote' },
        },
        parseDOM: [
          {
            tag: 'div.iglNote',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'iglNote',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'iglNote' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      inlineBox: {
        content: 'inline*',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'inlineBox' },
        },
        parseDOM: [
          {
            tag: 'p.inlineBox',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'inlineBox',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'inlineBox' }
          return ['p', attrs, 0]
        },
      },
    })

    createNode({
      intro: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'intro' },
        },
        parseDOM: [
          {
            tag: 'div.intro',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'intro',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'intro' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      meta: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'meta' },
        },
        parseDOM: [
          {
            tag: 'div.meta',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'meta',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'meta' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      ol: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'ol' },
        },
        parseDOM: [
          {
            tag: 'div.ol',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'ol',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'ol' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      part: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'part' },
        },
        parseDOM: [
          {
            tag: 'div.part',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'part',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'part' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      poem: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'poem' },
        },
        parseDOM: [
          {
            tag: 'div.poem',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'poem',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'poem' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      pref: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'pref' },
        },
        parseDOM: [
          {
            tag: 'div.pref',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'pref',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'pref' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      primaryDocument: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'primaryDocument' },
        },
        parseDOM: [
          {
            tag: 'div.primaryDocument',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'primaryDocument',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'primaryDocument' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      quo: {
        content: 'inline*',
        group: 'block',
        priority: 0,
        defining: true,
        attrs: {
          class: { default: 'quo' },
        },
        parseDOM: [
          {
            tag: 'p.quo',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'quo',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = {
            class: hook.node?.attrs?.class || 'quo',
          }

          return ['p', attrs, 0]
        },
      },
    })

    createNode({
      ref: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'ref' },
        },
        parseDOM: [
          {
            tag: 'div.ref',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'ref',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'ref' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      seriesPage: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'seriesPage' },
        },
        parseDOM: [
          {
            tag: 'div.seriesPage',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'seriesPage',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'seriesPage' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      stanza: {
        content: 'inline*',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'stanza' },
        },
        parseDOM: [
          {
            tag: 'p.stanza',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'stanza',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'stanza' }
          return ['p', attrs, 0]
        },
      },
    })

    createNode({
      tableFnGroup: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'tableFnGroup' },
        },
        parseDOM: [
          {
            tag: 'div.tableFnGroup',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'tableFnGroup',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'tableFnGroup' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      tableWrap: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'tableWrap' },
        },
        parseDOM: [
          {
            tag: 'div.tableWrap',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'tableWrap',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'tableWrap' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      termSec: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'termSec' },
        },
        parseDOM: [
          {
            tag: 'div.termSec',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'termSec',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'termSec' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      toc: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'toc' },
        },
        parseDOM: [
          {
            tag: 'div.toc',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'toc',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'toc' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      tocIllustrations: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'tocIllustrations' },
        },
        parseDOM: [
          {
            tag: 'div.tocIllustrations',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'tocIllustrations',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'tocIllustrations' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      ul: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'ul' },
        },
        parseDOM: [
          {
            tag: 'div.ul',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'ul',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'ul' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      appGroup: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'appGroup' },
        },
        parseDOM: [
          {
            tag: 'div.appGroup',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'appGroup',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'appGroup' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      abs: {
        content: 'block+',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'abs' },
        },
        parseDOM: [
          {
            tag: 'div.abs',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'abs',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'abs' }
          return ['div', attrs, 0]
        },
      },
    })

    createNode({
      bHead: {
        content: 'inline*',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'bHead' },
        },
        parseDOM: [
          {
            tag: 'p.bHead',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'bHead',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'bHead' }
          return ['p', attrs, 0]
        },
      },
    })

    createNode({
      cHead: {
        content: 'inline*',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'cHead' },
        },
        parseDOM: [
          {
            tag: 'p.cHead',
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook?.dom?.getAttribute('class') || 'cHead',
              })
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'cHead' }
          return ['p', attrs, 0]
        },
      },
    })
  }
}

export default AnnotationTagsService
