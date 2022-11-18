import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  Heading,
  HeadingWithAction,
  HiddenTabsContainer,
  Tab,
  TabContainer,
} from '../../../shared'
import { Container } from '../style'

const TabLink = styled(Link)`
  color: ${th('colorText')};
`

const DashboardLayout = ({
  newSubmission,
  createNewTaskAlerts, // For testing only. Pass in null to disable.
  urlFrag,
  children,
}) => {
  const location = useLocation()

  const dashboardPages = [
    {
      href: '/dashboard/submissions',
      label: 'Submissions',
    },
    {
      href: '/dashboard/reviews',
      label: 'Reviews',
    },
    {
      href: '/dashboard/edits',
      label: 'Edits',
    },
  ]

  return (
    <Container>
      <HeadingWithAction>
        <Heading>Dashboard</Heading>
        <Button onClick={newSubmission} primary>
          + New submission
        </Button>
        {createNewTaskAlerts && (
          <Button onClick={createNewTaskAlerts}>New Alerts</Button>
        )}
      </HeadingWithAction>
      <HiddenTabsContainer sticky={false}>
        <div style={{ display: 'flex' }}>
          {dashboardPages.map(({ href, label }) => (
            <TabContainer key={href}>
              <TabLink to={urlFrag + href}>
                <Tab active={location.pathname.endsWith(href)}>{label}</Tab>
              </TabLink>
            </TabContainer>
          ))}
        </div>
      </HiddenTabsContainer>
      {children}
    </Container>
  )
}

export default DashboardLayout
