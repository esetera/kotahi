import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const Page = styled.div`
  margin: auto;
  max-width: 60em;
`

const Section = styled.div`
  margin: ${th('gridUnit')} 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${th('gridUnit')} * 2);
  }
`

const Heading = styled.div`
  color: ${th('colorPrimary')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading3')};
  margin: ${th('gridUnit')} 0;
  text-transform: uppercase;
`

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
`

export { Page, Section, Heading, UploadContainer }
