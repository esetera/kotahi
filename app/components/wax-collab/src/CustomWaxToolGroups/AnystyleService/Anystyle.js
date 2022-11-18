import React, { useContext } from 'react'
import { decorate, injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty } from 'lodash'
import { WaxContext } from 'wax-prosemirror-core'
import { LeftSideButton } from 'wax-prosemirror-components'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'
import anystyleConnector from './anystyleConnector'

class AnyStyle extends Tools {
  title = 'Change to Anystyle'
  label = 'Change to Anystyle'
  color = 'colorFirstPage'
  className = 'anystyle-parsed-citation'
  // icon = 'title'
  name = 'Anystyle'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return true
  }

  select = state => {
    const {
      selection: { from },
    } = state

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
    const { updateAnystyle } = this.config.get('AnystyleService')

    console.log("What's passed through: ", updateAnystyle)

    if (isEmpty(view)) return null
    const context = useContext(WaxContext)

    const connector = anystyleConnector(
      view,
      updateAnystyle,
      this.pmplugins.get('anystylePlaceHolder'),
      context,
    )

    return this._isDisplayed ? (
      <LeftSideButton
        anystyleConnector={connector}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null
  }
}

decorate(injectable(), AnyStyle)

export default AnyStyle
