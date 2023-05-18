import React from 'react'
import styled from 'styled-components'
import TableCitation from './TableCitation'

const Wrapper = styled.div`
  display: flex;
  align-item: center !important;
  height: initial !important;
  max-width: 100px;
  padding-left: 4px;
  padding-right: 4px;
  button {
    font-size: 12px;
  }
`

const TableCitationTool = () => {
  return (
    <Wrapper>
      <TableCitation />
    </Wrapper>
  )
}

export default TableCitationTool
