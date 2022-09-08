import { Service } from 'wax-prosemirror-services'
import Appendix from './Appendix'
import AppendixHeader from './AppendixHeader'
import FrontMatter from './FrontMatter'
import Abstract from './Abstract'
import AcknowledgementsSection from './AcknowledgementSection'
import RefList from './citations/RefList'
import ReferenceHeader from './citations/ReferenceHeader'
import Reference from './citations/Reference'
import ArticleTitle from './citations/ArticleTitle'
import JournalTitle from './citations/JournalTitle'
import MixedCitationSpan from './citations/MixedCitationSpan'
import AuthorName from './citations/AuthorName'
import AuthorGroup from './citations/AuthorGroup'
import Volume from './citations/Volume'
import Issue from './citations/Issue'
import Doi from './citations/Doi'
import Year from './citations/Year'
import FirstPage from './citations/FirstPage'
import LastPage from './citations/LastPage'

// copied from here: https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-services/src/DisplayBlockLevel/HeadingService/HeadingService.js

// Note that toDOM for a lot of the Wax marks looks like this:

// toDOM(hook, next) {
// 	hook.value = ['span', hook.node.attrs, 0];
// 	next();
// },
//
// ( https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-schema/src/marks/smallcapsMark.js )
//
// though in prosemirror this tends to look like this:
//
// toDOM() {
// 	return ['span', { class: 'mixed-citation' }, 0]
// },

// FIGURE OUT:
//
// - how can we exclude more than one thing? just an array?

class JatsTagsService extends Service {
  // boot() {}

  register() {
    this.container.bind('Reference').to(Reference)
    this.container.bind('Appendix').to(Appendix)
    this.container.bind('AppendixHeader').to(AppendixHeader)
    this.container.bind('RefList').to(RefList)
    this.container.bind('ReferenceHeader').to(ReferenceHeader)
    this.container.bind('FrontMatter').to(FrontMatter)
    this.container.bind('Abstract').to(Abstract)
    this.container.bind('AcknowledgementsSection').to(AcknowledgementsSection)
    this.container.bind('ArticleTitle').to(ArticleTitle)
    this.container.bind('JournalTitle').to(JournalTitle)
    this.container.bind('MixedCitationSpan').to(MixedCitationSpan)
    this.container.bind('AuthorName').to(AuthorName)
    this.container.bind('AuthorGroup').to(AuthorGroup)
    this.container.bind('Doi').to(Doi)
    this.container.bind('Volume').to(Volume)
    this.container.bind('Issue').to(Issue)
    this.container.bind('Year').to(Year)
    this.container.bind('FirstPage').to(FirstPage)
    this.container.bind('LastPage').to(LastPage)
    const createNode = this.container.get('CreateNode')
    const createMark = this.container.get('CreateMark')
    createNode({
      reference: {
        content: 'inline*',
        group: 'block',
        defining: true,
        attrs: {
          class: { default: 'reference' },
        },
        parseDOM: [
          {
            tag: 'p.reference',
            getAttrs(hook, next) {
              Object.assign(hook, {
                // this conked out in FullWaxEditor so I adjusted
                class: hook?.dom?.getAttribute('class') || 'reference',
              })
              // this conked out in FullWaxEditor so I adjusted
              typeof next !== 'undefined' && next()
            },
          },
        ],
        toDOM(hook) {
          const attrs = { class: hook.node?.attrs?.class || 'reference' }
          return ['p', attrs, 0]
        },
      },
    })
    createNode({
      refList: {
        content: 'block+',
        // content: 'referenceHeader? reference*', // this was more specific
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
    createMark({
      mixedCitationSpan: {
        attrs: {
          class: { default: 'mixed-citation' },
        },
        excludes: 'mixedCitationSpan', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.mixed-citation' }],
        toDOM() {
          // TODO: This should send this to Crossref to get back content!
          return ['span', { class: 'mixed-citation' }, 0]
        },
      },
    })
    createMark({
      articleTitle: {
        attrs: {
          class: { default: 'article-title' },
        },
        excludes: 'articleTitle', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.article-title' }],
        toDOM() {
          return ['span', { class: 'article-title' }, 0]
        },
      },
    })
    createMark({
      journalTitle: {
        attrs: {
          class: { default: 'journal-title' },
        },
        excludes: 'articleTitle', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.journal-title' }],
        toDOM() {
          return ['span', { class: 'journal-title' }, 0]
        },
      },
    })
    createMark({
      authorGroup: {
        attrs: {
          class: { default: 'author-group' },
        },
        excludes: 'authorGroup', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.author-group' }],
        toDOM() {
          return ['span', { class: 'author-group' }, 0]
        },
      },
    })
    createMark({
      authorName: {
        attrs: {
          class: { default: 'author-name' },
        },
        excludes: 'authorName', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.author-name' }],
        toDOM() {
          return ['span', { class: 'author-name' }, 0]
        },
      },
    })
    createMark({
      volume: {
        attrs: {
          class: { default: 'volume' },
        },
        excludes: 'volume', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.volume' }],
        toDOM() {
          return ['span', { class: 'volume' }, 0]
        },
      },
    })
    createMark({
      issue: {
        attrs: {
          class: { default: 'issue' },
        },
        excludes: 'issue', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.issue' }],
        toDOM() {
          return ['span', { class: 'issue' }, 0]
        },
      },
    })
    createMark({
      year: {
        attrs: {
          class: { default: 'year' },
        },
        excludes: 'year', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.year' }],
        toDOM() {
          return ['span', { class: 'year' }, 0]
        },
      },
    })
    createMark({
      firstPage: {
        attrs: {
          class: { default: 'first-page' },
        },
        excludes: 'firstPage', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.first-page' }],
        toDOM() {
          return ['span', { class: 'first-page' }, 0]
        },
      },
    })
    createMark({
      lastPage: {
        attrs: {
          class: { default: 'last-page' },
        },
        excludes: 'lastPage', // so we can't embed it inside itself
        parseDOM: [{ tag: 'span.last-page' }],
        toDOM() {
          return ['span', { class: 'last-page' }, 0]
        },
      },
    })
    createMark({
      doi: {
        // QUESTION: this should set the content as the href. Does it do that?
        attrs: {
          href: { default: null },
          rel: { default: '' },
          target: { default: 'blank' },
          title: { default: null },
          class: { default: 'doi' },
        },
        excludes: 'doi', // so we can't embed it inside itself
        inclusive: false, // see: https://prosemirror.net/examples/schema/
        parseDOM: [
          // but see https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-schema/src/marks/linkMark.js
          {
            tag: 'a.doi',
            getAttrs(dom) {
              return { href: dom.href }
            },
          },
        ],
        toDOM() {
          // TODO: figure out how to get the href to go to the content?
          return ['a', { class: 'doi', href: 'hello!' }, 0]
        },
        // // this causes an error – why?
        // toDOM(hook, next) {
        //   // eslint-disable-next-line no-param-reassign
        //   hook.value = ['a', hook?.node?.attrs, 0]
        //   next()
        // },
      },
    })
  }
}

export default JatsTagsService
