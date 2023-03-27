import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import EditorElements from './EditorElements'

export const NotesAreaContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  /* PM styles  for note content*/
  ${EditorElements}

  .ProseMirror {
    display: inline;
  }
`

export const ReadOnlyNotesAreaContainer = styled.div`
  background: #fff;
  border-top: 1px solid ${th('colorFurniture')};
  grid-column-start: editorCol;
  grid-row-start: notesRow;
  width: 100%;

  .ProseMirror {
    display: inline;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${EditorElements}
`

export const NotesContainer = styled.div`
  padding-left: 32px;
  counter-reset: footnote-view;
  display: flex;
  flex-direction: column;
  padding-bottom: ${grid(4)};
  height: 100%;
  width: 65%;
`

export const NotesHeading = styled.div`
  color: ${th('colorPrimary')};
  margin: 3px 7px 3px -32px;
  text-transform: uppercase;
`
