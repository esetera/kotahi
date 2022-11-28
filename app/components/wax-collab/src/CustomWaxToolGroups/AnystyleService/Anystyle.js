import React, { useContext } from 'react'
import { decorate, injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty } from 'lodash'
// import { WaxContext } from 'wax-prosemirror-core'
import { Commands } from 'wax-prosemirror-utilities'
import { toggleMark } from 'prosemirror-commands'
import { Tools } from 'wax-prosemirror-services'
import AnstyleLeftSideButton from './AnstyleLeftSideButton'

class AnyStyle extends Tools {
  title = 'Change to Anystyle'
  label = 'Change to Anystyle'
  color = 'colorCitation'
  className = 'anystyle-parsed-citation'
  // icon = 'title'
  name = 'Anystyle'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      console.log('in run')
      // console.log()
      toggleMark(state.config.schema.marks.anystylemixedcitation)(
        state,
        dispatch,
      )

      // Commands.setMarkType(state.config.schema.marks.anystylemixedcitation, {
      //   level: 1,
      // })(state, dispatch)
    }
  }

  get active() {
    return state => {
      return Commands.markActive(
        state.config.schema.marks.anystylemixedcitation,
      )(state)
    }
  }

  select = state => {
    const from = state?.selection?.from || null

    if (from === null) return false
    return true
  }

  get enable() {
    return state => {
      return Commands.canInsert(
        state.config.schema.marks.anystylemixedcitation,
      )(state)
    }
  }

  renderTool(view) {
    const { updateAnystyle } = this.config.get('config.AnystyleService')

    if (isEmpty(view)) return null

    return this._isDisplayed ? (
      // this should be memoized?
      <AnstyleLeftSideButton
        item={this.toJSON()}
        key={uuidv4()}
        placeholder={this.pmplugins.get('anystylePlaceHolder')}
        updateAnystyle={updateAnystyle}
        view={view}
      />
    ) : null
  }
}

decorate(injectable(), AnyStyle)

export default AnyStyle
