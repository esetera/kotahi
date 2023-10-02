import React from 'react'
import PropTypes from 'prop-types'
import ReadonlyFormTemplate from '../../component-review/src/components/metadata/ReadonlyFormTemplate'
import MessageContainer from '../../component-chat/src/MessageContainer'

import {
  HiddenTabs,
  Columns,
  Chat,
  Manuscript,
  ErrorBoundary,
} from '../../shared'

import EditorSection from '../../component-review/src/components/decision/EditorSection'

const AuthorProofing = ({
  currentUser,
  submissionForm,
  threadedDiscussions,
  versions,
}) => {
  const version = versions[0].manuscript // Latest comes first
  const parent = versions[versions.length - 1].manuscript

  const editorSection = {
    content: (
      <EditorSection
        currentUser={currentUser}
        manuscript={version}
        readonly={false}
        saveSource={() => {}} // TODO
      />
    ),
    key: 'editor',
    label: 'Manuscript proofing',
  }

  const metadataSection = {
    content: (
      <ReadonlyFormTemplate
        form={submissionForm}
        formData={{
          ...version,
          submission: JSON.parse(version.submission),
        }}
        manuscript={version}
        showEditorOnlyFields={false}
        threadedDiscussionProps={{ threadedDiscussions }}
        title="Metadata"
      />
    ),
    key: 'metadata',
    label: 'Metadata',
  }

  const feedbackSection = {
    content: 'TODO: Add a new feedback form to go here.',
    key: 'feedback',
    label: 'Feedback',
  }

  // Protect if channels don't exist for whatever reason
  let channelId

  if (Array.isArray(parent.channels) && parent.channels.length) {
    channelId = parent.channels.find(c => c.type === 'all').id
  }

  return (
    <Columns>
      <Manuscript>
        <ErrorBoundary>
          <HiddenTabs
            defaultActiveKey="editor"
            sections={[editorSection, metadataSection, feedbackSection]}
          />
        </ErrorBoundary>
      </Manuscript>
      <Chat>
        <MessageContainer channelId={channelId} currentUser={currentUser} />
      </Chat>
    </Columns>
  )
}

const formPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      sectioncss: PropTypes.string,
      id: PropTypes.string.isRequired,
      component: PropTypes.string.isRequired,
      group: PropTypes.string,
      placeholder: PropTypes.string,
      validate: PropTypes.arrayOf(PropTypes.object.isRequired),
      validateValue: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.number.isRequired,
        ]).isRequired,
      ),
    }).isRequired,
  ).isRequired,
  popuptitle: PropTypes.string,
  popupdescription: PropTypes.string,
  haspopup: PropTypes.string.isRequired, // bool as string
})

AuthorProofing.propTypes = {
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      manuscript: PropTypes.objectOf(PropTypes.any),
      label: PropTypes.string,
    }),
  ).isRequired,
  submissionForm: formPropTypes.isRequired,
  currentUser: PropTypes.shape({
    groupRoles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
}
AuthorProofing.defaultProps = {
  currentUser: { groupRoles: [] },
}

export default AuthorProofing
