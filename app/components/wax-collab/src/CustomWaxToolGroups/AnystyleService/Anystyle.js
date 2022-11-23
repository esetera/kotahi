import React, { useContext } from 'react'
import { decorate, injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty } from 'lodash'
import { WaxContext } from 'wax-prosemirror-core'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'
import AnstyleLeftSideButton from './AnstyleLeftSideButton'
import anystyleConnector from './anystyleConnector'

class AnyStyle extends Tools {
  title = 'Change to Anystyle'
  label = 'Change to Anystyle'
  color = 'colorCitation'
  className = 'anystyle-parsed-citation'
  // icon = 'title'
  name = 'Anystyle'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return true
  }

  select = state => {
    const from = state?.selection?.from || null

    if (from === null) return false
    return true
  }

  get enable() {
    return state => {
      return Commands.canInsert(
        state.config.schema.nodes.anystylemixedcitation,
      )(state)
    }
  }

  renderTool(view) {
    const { updateAnystyle } = this.config.get('config.AnystyleService')

    if (isEmpty(view)) return null

    return this._isDisplayed ? (
      // this should be memoized?
      <AnstyleLeftSideButton
        connector={anystyleConnector}
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
