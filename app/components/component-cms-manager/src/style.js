import styled, { css } from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import {
  ScrollableContent,
  TextInput,
  Heading,
  ActionButton,
} from '../../shared'

export const Section = styled.div`
  margin: 16px 16px 0px 0px;
  ${props =>
    props.flexGrow &&
    css`
      flex-grow: 1;
      & > div {
        height: 100%;
      }
    `}
`

export const Legend = styled.div`
  font-weight: 600;
  margin-bottom: ${({ space, theme }) => space && theme.gridUnit};
`

export const Page = styled.div`
  height: 100%;
  position: relative;
  z-index: 0;
`

export const CMSPageListRow = styled.div`
  align-items: center;
  background-color: ${th('colorBackground')};
  border-top: ${th('borderWidth')} ${th('borderStyle')} ${th('colorFurniture')};
  column-gap: ${grid(2)};
  display: flex;
  flex-direction: row;
  height: 48px;
  line-height: 1.4em;
  text-align: left;
  width: 100%;

  &:first-child {
    border-top: none;
    padding: ${grid(0.5)} ${grid(2)};
  }

  &:not(:first-child) {
    padding: ${grid(1.5)} ${grid(2)};
  }
`

export const CMSPageHeaderRow = styled(CMSPageListRow)`
  background-color: ${th('colorSecondaryBackground')};
  border-radius: 8px 8px 0px 0px;
  line-height: 1.25em;
`

export const CMSPagesLeftPane = styled.div`
  display: flex;
  flex-grow: 2;
  max-width: 50%;
`

export const CheckboxInput = styled.input`
  margin-right: 5px;
`

export const Hrstyle = styled.hr`
  margin-top: 7px;
  width: 35px;

  ::after {
    background-color: ${props => props.theme.colors.additional.green};
  }
`

export const VerticalBar = styled.div`
  border-right: 1px solid #111111;
  height: 16px;
  margin: 0px 10px 0px 10px;
`

export const Status = styled.p`
  color: ${props => props.theme.colors.additional.green};
  font-size: 10px;
  font-weight: 400;
`

export const NewEditText = styled.p`
  color: ${props => props.theme.colors.additional.green};
`

export const CMSPagesRightPane = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`

export const CMSPageTableStyled = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  width: 100%;
`

export const Cell = styled.div`
  display: flex;

  flex: ${({ flex }) => flex ?? '0 1 12em'};
  flex-direction: row;
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
  ${props =>
    props.centered &&
    css`
      justify-content: center;
    `}
  overflow-wrap: anywhere;
`

export const CellPageTitle = styled.div`
  color: ${props => props.theme.colorPrimary};
  display: flex;
  font-weight: 600;
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}

  overflow-wrap: anywhere;
`

export const Heading2 = styled(Heading)`
  cursor: pointer;
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: 600;
  line-height: ${th('lineHeightBaseSmall')};
  padding-bottom: 12px;
  padding-top: 12px;
`

export const PageTableContainer = styled(ScrollableContent)`
  margin-top: 25px;
`

export const FormTextInput = styled(TextInput)`
  background: white;
  padding: 10px;
`

export const EditPageContainer = styled.div`
  display: flex;
  overflow: scroll;
`

export const EditPageLeft = styled.div`
  min-width: 10rem;
  padding-top: 16px;
`

export const EditPageRight = styled.div`
  background-color: #f4f5f7;
  flex-grow: 1;
  padding-left: 16px;
  padding-top: 16px;
`

export const EditorForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ActionButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
`

export const FormActionButton = styled(ActionButton)`
  min-width: 0px;
`

export const FullWidthANDHeight = styled.div`
  height: auto;
  width: 100%;
`

export const ControlsContainer = styled.div`
  display: flex;
  flex: 1 1;
  gap: ${grid(2)};
  justify-content: flex-end;
`

export const FlexRow = styled.div`
  display: flex;
  gap: ${grid(1)};
  justify-content: space-between;
`

export const StatusInfoText = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: 400;
  margin-right: 16px;
`

export const FlaxCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`
