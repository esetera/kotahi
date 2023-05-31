import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'

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

export const CMSPageRow = styled.div`
  align-items: center;
  background-color: ${th('colorBackground')};
  border-top: 1px solid ${th('colorFurniture')};
  column-gap: ${grid(2)};
  display: flex;
  flex-direction: row;
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

export const CMSPageHeaderRow = styled(CMSPageRow)`
  align-items: baseline;
  background-color: ${th('colorSecondaryBackground')};
  font-variant: all-small-caps;
  line-height: 1.25em;
`

export {
  Row,
  Cell,
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
