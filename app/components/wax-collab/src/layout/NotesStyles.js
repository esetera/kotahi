import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import EditorElements from './EditorElements'

export const NotesAreaContainer = styled.div`
  background: #fff;
  bottom: ${grid(-2)};
  box-shadow: 0 ${grid(-0.3)} ${grid(0.5)} ${grid(-0.2)} gray;
  grid-column-start: editorCol;
  grid-row-start: notesRow;
  /* height: 20vh;
  overflow-y: scroll;
  position: sticky; */
  width: 100%;

  &.productionnotes {
    grid-column-start: initial;
    grid-row-start: initial;
  }

  .ProseMirror {
    display: inline;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${EditorElements}
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
  counter-reset: footnote-view;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  width: 90%;
`

export const NotesHeading = styled.div`
  color: ${th('colorPrimary')};
  margin: 3px 7px;
  text-transform: uppercase;
`
