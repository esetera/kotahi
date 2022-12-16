import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  Heading,
  HeadingWithAction,
  HiddenTabsContainer,
  Tab,
  TabContainer,
} from '../../../shared'
import { Container } from '../style'
import SearchControl from '../../../component-manuscripts/src/SearchControl'
import { ControlsContainer } from '../../../component-manuscripts/src/style'

const TabLink = styled(Link)`
  color: ${th('colorText')};
  text-decoration: none;
`

const DashboardLayout = ({
  createNewTaskAlerts, // For testing only. Pass in null to disable.
  urlFrag,
  children,
}) => {
  const history = useHistory()
  const location = useLocation()

  const dashboardPages = [
    {
      href: '/dashboard/submissions',
      label: 'My Submissions',
    },
    {
      href: '/dashboard/reviews',
      label: 'To Review',
    },
    {
      href: '/dashboard/edits',
      label: "Manuscripts I'm Editor of",
    },
  ]

  return (
    <Container>
      <HeadingWithAction>
        <Heading>Dashboard</Heading>
        <ControlsContainer>
          {/* TODO: Add Search Bar functionality with URL Params */}
          <SearchControl applySearchQuery={() => {}} currentSearchQuery="" />
          <Button
            onClick={() => history.push(`${urlFrag}/newSubmission`)}
            primary
          >
            + New submission
          </Button>
          {createNewTaskAlerts && (
            <Button onClick={createNewTaskAlerts}>New Alerts</Button>
          )}
        </ControlsContainer>
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
