import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'
import { withRouter } from 'react-router-dom'
import { debounce } from 'lodash'
import ProductionWaxEditor from '../../../wax-collab/src/ProductionWaxEditor'
import { DownloadDropdown } from './DownloadDropdown'
import {
  Heading,
  HeadingWithAction,
  HiddenTabs,
  Manuscript,
  ErrorBoundary,
  SectionContent,
  Spinner,
} from '../../../shared'
import { Info } from './styles'
import { ControlsContainer } from '../../../component-manuscripts/src/style'
import AuthorFeedbackForm from '../../../component-author-feedback/src/components/AuthorFeedbackForm'

const FlexRow = styled.div`
  display: flex;
  gap: ${grid(1)};
  justify-content: space-between;
`

const Production = ({
  client,
  file,
  manuscript,
  currentUser,
  makePdf,
  makeJats,
  updateManuscript,
  onAssetManager,
  isAuthorProofingVersion,
  isReadOnlyVersion,
}) => {
  const debouncedSave = useCallback(
    debounce(source => {
      updateManuscript(manuscript.id, { meta: { source } })
    }, 2000),
    [],
  )

  useEffect(() => debouncedSave.flush, [])

  const editorSection = {
    content: (
      <>
        {file &&
        file.storedObjects[0].mimetype ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
          <SectionContent>
            {manuscript ? (
              <ProductionWaxEditor
                // onBlur={source => {
                //   updateManuscript(manuscript.id, { meta: { source } })
                // }}
                client={client}
                isAuthorProofingVersion={isAuthorProofingVersion}
                manuscriptId={manuscript.id}
                onAssetManager={onAssetManager}
                readonly={isReadOnlyVersion || false}
                saveSource={debouncedSave}
                user={currentUser}
                value={manuscript.meta.source}
              />
            ) : (
              <Spinner />
            )}
          </SectionContent>
        ) : (
          <SectionContent>
            <Info>No supported view of the file</Info>
          </SectionContent>
        )}
      </>
    ),
    key: 'editor',
    label: `Editor ${isReadOnlyVersion ? ' (read-only)' : ''}`,
  }

  const feedbackSection = {
    content: (
      <SectionContent>
        <AuthorFeedbackForm
          currentUser={currentUser}
          isAuthorProofingVersion={isAuthorProofingVersion}
          isReadOnlyVersion={isReadOnlyVersion}
          manuscript={manuscript}
          updateManuscript={updateManuscript}
        />
      </SectionContent>
    ),
    key: 'feedback',
    label: 'Feedback',
  }

  return (
    <Manuscript>
      <HeadingWithAction>
        <FlexRow>
          <Heading>
            {isAuthorProofingVersion ? 'Author Proofing' : 'Production'}
          </Heading>
          <ControlsContainer>
            <DownloadDropdown
              isAuthorProofingVersion={isAuthorProofingVersion}
              makeJats={makeJats}
              makePdf={makePdf}
              manuscriptId={manuscript.id}
              manuscriptSource={manuscript.meta.source}
            />
          </ControlsContainer>
        </FlexRow>
      </HeadingWithAction>
      <ErrorBoundary>
        <HiddenTabs
          defaultActiveKey="editor"
          sections={[editorSection, feedbackSection]}
        />
      </ErrorBoundary>
    </Manuscript>
  )
}

export default withRouter(Production)
