import { decorate, injectable } from 'inversify'
import { toggleMark } from 'prosemirror-commands'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'

class MixedCitation extends Tools {
  title = 'Change to mixed citation'
  label = 'Mixed citation'
  name = 'MixedCitation'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.mixedcitation)(state, dispatch)
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
      return Commands.markActive(state.config.schema.marks.mixedcitation)(state)
    }
  }
}

decorate(injectable(), MixedCitation)

export default MixedCitation
