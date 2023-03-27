import React from 'react'
import { decorate, injectable } from 'inversify'
import { isEmpty } from 'lodash'
import { LeftSideButton } from 'wax-prosemirror-components'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'

class InlineBox extends Tools {
  title = 'Change to Inline-Box block'
  label = 'Inline-Box'
  title = 'Inline-Box'
  name = 'Inline-Box'

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.inlineBox)(state, dispatch)
    }
  }

  get active() {
    return (state, activeViewId) => {
      let isActive = false
      if (activeViewId !== 'main') return false

      const { from, to } = state.selection
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'inlineBox') {
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
      return Commands.setBlockType(state.config.schema.nodes.inlineBox)(
        state,
      )
    }
  }
  
  renderTool(view) {
    if (isEmpty(view)) return null
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="inlineBox" view={view} />
    ) : null
  }
}

decorate(injectable(), InlineBox)

export default InlineBox
