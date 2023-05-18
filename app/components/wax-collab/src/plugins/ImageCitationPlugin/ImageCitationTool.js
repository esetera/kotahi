import React from 'react'
import styled from 'styled-components'
import ImageCitation from './ImageCitation'

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

const ImageCitationTool = () => {
  return (
    <Wrapper>
      <ImageCitation />
    </Wrapper>
  )
}

export default ImageCitationTool
