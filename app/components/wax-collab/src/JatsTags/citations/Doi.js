import { decorate, injectable } from 'inversify'
import { toggleMark } from 'prosemirror-commands'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'

class Doi extends Tools {
  title = 'Change to DOI'
  label = 'DOI'
  icon = 'title'
  name = 'Doi'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.doi)(state, dispatch)
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
      return Commands.markActive(state.config.schema.marks.doi)(state)
    }
  }
}

decorate(injectable(), Doi)

export default Doi
