import React from 'react'
import { decorate, injectable } from 'inversify'
import { isEmpty } from 'lodash'
import { LeftSideButton } from 'wax-prosemirror-components'
import { Commands } from 'wax-prosemirror-utilities'
import { Tools } from 'wax-prosemirror-services'
import { wrapIn } from 'prosemirror-commands'

class TableFnGroup extends Tools {
  title = 'Change to Table-Fn-Group block'
  label = 'Table-Fn-Group'
  title = 'Table-Fn-Group'
  name = 'Table-Fn-Group'

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.tableFnGroup)(state, dispatch)
    }
  }

  get active() {
    return (state, activeViewId) => {
      let isActive = false
      if (activeViewId !== 'main') return false

      const { from, to } = state.selection
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'tableFnGroup') {
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
      return Commands.setBlockType(state.config.schema.nodes.tableFnGroup)(
        state,
      )
    }
  }

  renderTool(view) {
    if (isEmpty(view)) return null
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="tableFnGroup" view={view} />
    ) : null
  }
}

decorate(injectable(), TableFnGroup)

export default TableFnGroup
