import styled, { css } from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { ScrollableContent } from '../../shared'

export const Section = styled.div`
  margin: 16px;
`

export const Legend = styled.div`
  font-weight: 600;
  margin-bottom: ${({ space, theme }) => space && theme.gridUnit};
`

export const Page = styled.div`
  position: relative;
  z-index: 0;
`

export const CMSPageListRow = styled.div`
  align-items: center;
  background-color: ${th('colorBackground')};
  border-top: 1px solid ${th('colorFurniture')};
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
`

export const CheckboxInput = styled.input`
  margin-right: 5px;
`
export const Status = styled.span`
  color: ${props => props.theme.colors.additional.green};
  font-size: 11px;
  padding-left: 10px;
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

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}

  overflow-wrap: anywhere;
`

export const HeadingCell = styled(Cell)`
  align-items: center;
  display: flex;
`

export const PageTableContainer = styled(ScrollableContent)`
  margin-top: 25px;
`

export {
  Row,
  LastCell,
  UserCombo,
  Primary,
  Secondary,
  UserInfo,
  Container,
  Table,
  Content,
  Heading,
  Carets,
  CaretUp,
  CaretDown,
  Spinner,
  Pagination,
  Title,
  Header,
} from '../../shared'
