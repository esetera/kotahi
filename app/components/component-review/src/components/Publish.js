import React, { useEffect, useState } from 'react'
import { Button } from '@pubsweet/ui'

import { useQuery } from '@apollo/client'
import { getFullDois } from './queries'
import {
  Title,
  SectionHeader,
  SectionRowGrid,
  SectionActionInfo,
  SectionAction,
} from './style'

import { SectionContent } from '../../../shared'
import Alert from './publishing/Alert'

const Publish = ({ manuscript, publishManuscript, isDisplayed }) => {
  // Hooks from the old world
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishResponse, setPublishResponse] = useState(null)
  const [publishingError, setPublishingError] = useState(null)

  const notAccepted = !['accepted', 'published'].includes(manuscript.status)

  const { loading, data, refetch } = useQuery(getFullDois, {
    variables: { id: manuscript.id },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (isDisplayed) {
      refetch()
    }
  }, [isDisplayed])

  return (
    <SectionContent>
      <SectionHeader>
        <Title>Publishing</Title>
      </SectionHeader>

      <SectionRowGrid>
        <SectionActionInfo>
          {manuscript.published &&
            `This submission was published on ${manuscript.published}`}
          {!manuscript.published && notAccepted && (
            <div>
              <p>You can only publish accepted submissions.</p>
              {!loading && data.getFullDois.listOfDois && (
                <p>
                  DOIs to be published: {data.getFullDois.listOfDois.join(', ')}
                </p>
              )}
            </div>
          )}
          {!manuscript.published && !notAccepted && (
            <div>
              <p>
                Publishing will add a new entry on the public website and can
                not be undone.
              </p>
              {!loading && data.getFullDois.listOfDois && (
                <p>
                  DOIs to be published: {data.getFullDois.listOfDois.join(', ')}
                </p>
              )}
            </div>
          )}
          {publishResponse &&
            publishResponse.steps.map(step => {
              if (step.succeeded) {
                return (
                  <Alert key={step.stepLabel} type="success">
                    Posted to {step.stepLabel}
                  </Alert>
                )
              }

              return (
                <Alert
                  detail={step.errorMessage}
                  key={step.stepLabel}
                  type="error"
                >
                  Error posting to {step.stepLabel}
                </Alert>
              )
            })}
          {publishingError && <Alert type="error">{publishingError}</Alert>}
        </SectionActionInfo>
        <SectionAction>
          <Button
            disabled={notAccepted || isPublishing}
            onClick={() => {
              setIsPublishing(true)

              publishManuscript({ variables: { id: manuscript.id } })
                .then((res, error) => {
                  setIsPublishing(false)
                  setPublishResponse(res.data.publishManuscript, error)
                })
                .catch(error => {
                  console.error(error)
                  setIsPublishing(false)
                  setPublishingError(error.message)
                })
            }}
            primary
          >
            {manuscript.published ? 'Republish' : 'Publish'}
          </Button>
        </SectionAction>
      </SectionRowGrid>
    </SectionContent>
  )
}

export default Publish
