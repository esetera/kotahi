import React from 'react'
import styled from 'styled-components'
import AuthorCitation from './AuthorCitation'

const Wrapper = styled.div`
  display: flex;
  align-item: center !important;
  padding-left: 4px;
  padding-right: 4px;
  height: initial !important;
  max-width: 100px;
  button {
    font-size: 12px;
  }
`

const AuthorCitationTool = () => {
  return (
    <Wrapper>
      <AuthorCitation />
    </Wrapper>
  )
}

export default AuthorCitationTool
