import React, { useContext, useMemo, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { MenuButton } from 'wax-prosemirror-components'
import { WaxContext } from 'wax-prosemirror-core'
import { DOMParser } from 'prosemirror-model'

// import { DocumentHelpers } from 'wax-prosemirror-utilities'
import { TextSelection } from 'prosemirror-state'

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`

  return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body
}

const activeStyles = css`
  pointer-events: none;
`

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`

const AnstyleLeftSideButton = ({
  updateAnystyle,
  placeholderPlugin,
  view = {},
  item,
}) => {
  const { active, icon, label, run, select, title } = item

  const {
    app,
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext)

  const { dispatch, state } = view

  // const anystyleMarks = DocumentHelpers.findChildrenByType(
  //   state.doc,
  //   state.config.schema.marks.anystylemixedcitation,
  //   true,
  // )

  const handleMouseDown = async (e, editorState) => {
    e.preventDefault()
    // console.log('in handle mouse down')

    if (editorState.selection.from < editorState.selection.to) {
      // this protects against no selection
      const textSelection = new TextSelection(
        editorState.selection.$from,
        editorState.selection.$to,
      )

      const content = textSelection.content()
      const { textContent } = content.content.content[0]

      // console.log('text selection: ', textContent)

      const returned = await updateAnystyle(textContent)
      console.log('returned: ', returned)
      // TODO: replace the current selection with the returned HTML!

      const { tr } = editorState
      const parser = DOMParser.fromSchema(main.state.config.schema)
      const parsedContent = parser.parse(elementFromString(returned))

      let sectionNode
      let sectionNodePosition

      main.state.doc.nodesBetween(
        editorState.selection.from,
        editorState.selection.to,
        (node, pos) => {
          // if (node.type.name === 'oen_container') {
          sectionNode = node
          sectionNodePosition = pos
          // }
        },
      )

      tr.replaceWith(
        sectionNodePosition + 1,
        sectionNodePosition + sectionNode.content.size,
        parsedContent,
      )
      // selectionToInsertionEnd(tr, tr.steps.length - 1, -1);
      dispatch(tr)

      // run(editorState, dispatch)
    } else {
      console.log('nothing selected!')
    }
  }

  // const serviceConfig = app.config.get('config.AnystyleService')

  // let chapterTitle = ''
  // if (anystyleMarks[0]) chapterTitle = anystyleMarks[0].mark.textContent

  // useEffect(() => {
  //   if (anystyleMarks[0]) {
  //     console.log('in use effect if!')
  //     if (serviceConfig) console.log(anystyleMarks[0].mark.textContent)
  //     // serviceConfig.updateTitle(titleNode[0].mark.textContent)
  //   } else if (serviceConfig) {
  //     // serviceConfig.updateTitle('')
  //   }
  // }, [chapterTitle])

  const isActive = !!active(state, activeViewId)
  let isDisabled = !select(state, activeViewId, activeView)

  const isEditable = main.props.editable(editable => {
    return editable
  })

  if (!isEditable) isDisabled = true

  const LeftSideButtonComponent = useMemo(
    () => (
      <StyledButton
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

  return LeftSideButtonComponent
}

export default AnstyleLeftSideButton
