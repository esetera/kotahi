import { decorate, injectable } from 'inversify'
import { toggleMark } from 'prosemirror-commands'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'

class LastPage extends Tools {
  title = 'Change to last page'
  label = 'Last page'
  color = 'colorLastPage'
  className = 'last-page'
  // icon = 'title'
  name = 'LastPage'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.lastPage)(state, dispatch)
    }
  }

  select = state => {
    const {
      selection: { from },
    } = state

    if (from === null) return false
    return true
  }

  // eslint-disable-next-line class-methods-use-this
  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.lastPage)(state)
    }
  }
}

decorate(injectable(), LastPage)

export default LastPage