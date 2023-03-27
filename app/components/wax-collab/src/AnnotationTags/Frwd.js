import React from 'react'
import { decorate, injectable } from 'inversify'
import { isEmpty } from 'lodash'
import { LeftSideButton } from 'wax-prosemirror-components'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'
import { wrapIn } from 'prosemirror-commands'

class Frwd extends Tools {
  title = 'Change to Frwd block'
  label = 'Frwd'
  title = 'Frwd'
  name = 'Frwd'

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.frwd)(state, dispatch)
    }
  }

  get active() {
    return (state, activeViewId) => {
      let isActive = false
      if (activeViewId !== 'main') return false

      const { from, to } = state.selection
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'frwd') {
          isActive = true
        }
      })
      return isActive
    }
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false
    return true
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.frwd)(
        state,
      )
    }
  }

  renderTool(view) {
    if (isEmpty(view)) return null
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="frwd" view={view} />
    ) : null
  }
}

decorate(injectable(), Frwd)

export default Frwd
