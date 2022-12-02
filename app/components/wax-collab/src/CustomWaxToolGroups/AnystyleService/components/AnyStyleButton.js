/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect } from 'react'
import { WaxContext /*, DocumentHelpers */ } from 'wax-prosemirror-core'
import { MenuButton } from 'wax-prosemirror-components'

const AnyStyleButton = ({ view = {}, item, anyStyle }) => {
  const { active, icon, label, run, select, title } = item

  const {
    app,
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext)

  const { dispatch, state } = view
  const serviceConfig = app.config.get('config.AnyStyleService')

  const handleMouseDown = (e, editorState) => {
    const {
      selection: { from, to },
    } = editorState

    /* this is the content that we have to get from the selection */
    anyStyle({ content: 'some dummy one' })
  }

  useEffect(() => {}, [])

  const isActive = !!active(state, activeViewId)
  let isDisabled = !select(state, activeViewId, activeView)

  const isEditable = main.props.editable(editable => {
    return editable
  })

  if (!isEditable) isDisabled = true

  const AnyStyleButtonComponent = useMemo(
    () => (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => handleMouseDown(e, view.state, view.dispatch)}
        title={title}
      />
    ),
    [isActive, isDisabled],
  )

  return AnyStyleButtonComponent
}

export default AnyStyleButton
