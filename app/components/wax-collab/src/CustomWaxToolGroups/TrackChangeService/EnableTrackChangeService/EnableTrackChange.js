import React, { useState, useMemo } from 'react'
import { injectable } from 'inversify'
import { isEmpty } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { Tools, MenuButton } from 'wax-prosemirror-core'

// this was initially imported from here: https://gitlab.coko.foundation/wax/wax-prosemirror/-/blob/master/wax-prosemirror-services/src/CommentsService/components/ui/trackChanges/TrackChangeEnable.js
const TrackChangeEnable = ({ view = {}, item, enabled }) => {
  const [isEnabled, setEnabled] = useState(enabled)

  const handleMouseDown = e => {
    e.preventDefault()
    setEnabled(!isEnabled)
    item.run(view.state, view.dispatch)
  }

  const TrackChangeEnableComponent = useMemo(
    () => (
      <MenuButton
        active={isEnabled}
        disabled={item.enable && !item.enable(view.state)}
        label="Track Changes"
        onMouseDown={e => handleMouseDown(e)}
        title={item.title}
      />
    ),
    [isEnabled],
  )

  return TrackChangeEnableComponent
}

@injectable()
export default class EnableTrackChange extends Tools {
  title = 'Toggle Track Changes'
  label = 'Track Changes'
  name = 'EnableTrackChange'

  get run() {
    return () => {
      this.config.enabled = !this.config.enabled
      return true
    }
  }

  /* eslint-disable-next-line class-methods-use-this */
  get enable() {
    return () => {
      return true
    }
  }

  renderTool(view) {
    if (isEmpty(view)) return null
    return this.isDisplayed() ? (
      <TrackChangeEnable
        enabled={this.config.enabled}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null
  }
}
