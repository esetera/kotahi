import { decorate, injectable } from 'inversify'
import { toggleMark } from 'prosemirror-commands'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'

class JournalTitle extends Tools {
  title = 'Change to journal title'
  label = 'Journal title'
  color = 'colorJournalTitle'
  className = 'journal-title'
  // icon = 'title'
  name = 'JournalTitle'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.journalTitle)(state, dispatch)
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
      return Commands.markActive(state.config.schema.marks.journalTitle)(state)
    }
  }
}

decorate(injectable(), JournalTitle)

export default JournalTitle