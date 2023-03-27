import React from 'react'
import { decorate, injectable } from 'inversify'
import { isEmpty } from 'lodash'
import { LeftSideButton } from 'wax-prosemirror-components'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'
import { wrapIn } from 'prosemirror-commands'

class Part extends Tools {
  title = 'Change to Part block'
  label = 'Part'
  title = 'Part'
  name = 'Part'

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.part)(state, dispatch)
    }
  }

  get active() {
    return (state, activeViewId) => {
      let isActive = false
      if (activeViewId !== 'main') return false

      const { from, to } = state.selection
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'part') {
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
      return Commands.setBlockType(state.config.schema.nodes.part)(
        state,
      )
    }
  }

  renderTool(view) {
    if (isEmpty(view)) return null
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="part" view={view} />
    ) : null
  }
}

decorate(injectable(), Part)

export default Part
