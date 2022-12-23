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
import { URI_SEARCH_PARAM } from '../../../../../config/journal/manuscripts'
import {
  URI_PAGENUM_PARAM,
  useQueryParams,
} from '../../../../shared/urlParamUtils'
import { FlexRow } from '../../../../globals'

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
  const applyQueryParams = useQueryParams()

  const uriQueryParams = new URLSearchParams(history.location.search)
  const currentSearchQuery = uriQueryParams.get(URI_SEARCH_PARAM)

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
        <FlexRow>
          <Heading>Dashboard</Heading>
          <ControlsContainer>
            <SearchControl
              applySearchQuery={newQuery =>
                applyQueryParams({
                  [URI_SEARCH_PARAM]: newQuery,
                  [URI_PAGENUM_PARAM]: 1,
                })
              }
              currentSearchQuery={currentSearchQuery}
            />
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
        </FlexRow>
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
