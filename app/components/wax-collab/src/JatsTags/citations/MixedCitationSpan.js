import { decorate, injectable } from 'inversify'
import { toggleMark } from 'prosemirror-commands'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'

class MixedCitationSpan extends Tools {
  title = 'Change to mixed citation span'
  label = 'Parsed citation'
  // icon = 'title'
  name = 'MixedCitationSpan'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.mixedCitationSpan)(state, dispatch)
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
      return Commands.markActive(state.config.schema.marks.mixedCitationSpan)(
        state,
      )
    }
  }
}

decorate(injectable(), MixedCitationSpan)

export default MixedCitationSpan
