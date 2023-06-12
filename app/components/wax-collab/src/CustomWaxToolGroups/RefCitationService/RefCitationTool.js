import React from 'react'
import { decorate, injectable } from 'inversify'
import { isEmpty } from 'lodash'
import { LeftSideButton, Commands, Tools } from 'wax-prosemirror-core'
// import { v4 as uuidv4 } from 'uuid'

class Reference extends Tools {
  title = 'Change to reference'
  label = 'Reference'
  name = 'Reference'
  color = 'colorAwardId'
  className = 'awardid'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch) => {
      console.log(state)
      Commands.setBlockType(state.config.schema.nodes.reference, {
        class: 'ref',
      })(state, dispatch)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get active() {
    return (state, activeViewId) => {
      let isActive = false
      if (activeViewId !== 'main') return false

      const { from, to } = state.selection
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'reference') {
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

  // eslint-disable-next-line class-methods-use-this
  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.reference)(state)
    }
  }

  renderTool(view) {
    if (isEmpty(view)) return null
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="Reference" view={view} />
    ) : null
  }
}

decorate(injectable(), Reference)

export default Reference
