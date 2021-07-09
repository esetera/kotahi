import React, { useState, useEffect } from 'react'
import {
  SectionHeader,
  SectionRowGrid,
  Title,
  StyledNotifyButton,
} from '../style'
import { SectionContent } from '../../../../shared'
import SelectReceiver from './SelectReceiver'
import SelectEmailTemplate from './SelectEmailTemaplate'

const EmailNotifications = () => {
  const [selectedReceiver, setSelectedReceiver] = useState({})

  const changeState = value => {
    setSelectedReceiver(value)
  }

  return (
    <SectionContent noGap>
      <SectionHeader>
        <Title>Notifications</Title>
      </SectionHeader>
      <SectionRowGrid>
        <SelectReceiver
          changeState={changeState}
          selectedReceiver={selectedReceiver}
        />
        <SelectEmailTemplate
          changeState={changeState}
          selectedReceiver={selectedReceiver}
        />
        <StyledNotifyButton
          primary
          onClick={() => console.log(selectedReceiver)}
        >
          Notify
        </StyledNotifyButton>
      </SectionRowGrid>
    </SectionContent>
  )
}

export default EmailNotifications
