import PropTypes from 'prop-types'
import React from 'react'
import { get } from 'lodash'
import SimpleWaxEditor from '../../../../wax-collab/src/SimpleWaxEditor'
import {
  Title,
  SectionHeader,
  SectionRowGrid,
  Heading,
  Cell,
  Affiliation,
  Email,
} from '../style'
import { SectionContent, Attachment } from '../../../../shared'
import ManuscriptFilesList from './ManuscriptFilesList'
import SpecialInstructions from './SpecialInstructions'
import ThreadedDiscussion from '../../../../component-formbuilder/src/components/builderComponents/ThreadedDiscussion/ThreadedDiscussion'

const showFieldData = (
  manuscript,
  fieldName,
  form,
  threadedDiscussionProps,
) => {
  const data = get(manuscript, fieldName)
  const fieldDefinition = form.children?.find(field => field.name === fieldName)

  if (fieldDefinition?.component === 'AuthorsInput' && Array.isArray(data)) {
    return (data || []).map((author, i) => {
      const firstName = author.firstName || '?'
      const lastName = author.lastName || '?'

      const affiliation = author.affiliation ? ` (${author.affiliation})` : ''

      return (
        // eslint-disable-next-line react/no-array-index-key
        <p key={i}>
          {lastName}, {firstName}
          <Affiliation>{affiliation}</Affiliation> <Email>{author.email}</Email>
        </p>
      )
    })
  }

  if (fieldDefinition?.component === 'LinksInput' && Array.isArray(data)) {
    return data.map(link => (
      <p key={link.url}>
        <a href={link.url} rel="noopener noreferrer" target="_blank">
          {link.url}
        </a>
      </p>
    ))
  }

  if (fieldDefinition?.component === 'ThreadedDiscussion' && data) {
    // data should be the threadedDiscussion ID
    const discussion = threadedDiscussionProps.threadedDiscussions.find(
      d => d.id === data,
    ) || {
      threads: [],
    }

    const augmentedThreadedDiscussionProps = {
      ...threadedDiscussionProps,
      threadedDiscussion: discussion,
      threadedDiscussions: undefined,
      shouldRenderSubmitButton: true,
    }

    return (
      <ThreadedDiscussion
        threadedDiscussionProps={augmentedThreadedDiscussionProps}
      />
    )
  }

  if (
    ['SupplementaryFiles', 'VisualAbstract'].includes(
      fieldDefinition?.component,
    ) &&
    Array.isArray(data)
  ) {
    return data.map(file => (
      <Attachment file={file} key={file.storedObjects[0].url} uploaded />
    ))
  }

  if (Array.isArray(data)) {
    return data.join(', ')
  }

  if (data && fieldDefinition?.component === 'AbstractEditor')
    return <SimpleWaxEditor readonly value={data} />

  return data
}

const ReadonlyFormTemplate = ({
  form,
  formData,
  hideSpecialInstructions,
  manuscript,
  showEditorOnlyFields,
  title,
  displayShortIdAsIdentifier,
  listManuscriptFiles,
  threadedDiscussionProps,
}) => {
  return (
    <SectionContent>
      {title ? (
        <SectionHeader>
          <Title>{title}</Title>
        </SectionHeader>
      ) : null}

      {displayShortIdAsIdentifier &&
        manuscript && ( // TODO The shortId shouldn't be rendered as part of this component. Split out!
          <SectionRowGrid>
            <Heading>Manuscript Number</Heading>
            <Cell>{manuscript.shortId}</Cell>
          </SectionRowGrid>
        )}

      {form.children
        .filter(element => {
          return (
            (showEditorOnlyFields || element.hideFromAuthors !== 'true') &&
            element.hideFromReviewers !== 'true'
          )
        })
        .map(element => (
          <SectionRowGrid key={element.id}>
            <Heading>{element.shortDescription || element.title}</Heading>
            <Cell>
              {showFieldData(
                formData,
                element.name,
                form,
                threadedDiscussionProps,
              )}
            </Cell>
          </SectionRowGrid>
        ))}
      {
        // TODO discuss the clear purpose for special instructions and manuscript files list then refactor accordingly!
        (listManuscriptFiles || !hideSpecialInstructions) && (
          <>
            {!hideSpecialInstructions && (
              <SpecialInstructions manuscript={manuscript} />
            )}
            {listManuscriptFiles && (
              <ManuscriptFilesList files={manuscript.files} />
            )}
          </>
        )
      }
    </SectionContent>
  )
}

ReadonlyFormTemplate.propTypes = {
  form: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        component: PropTypes.string,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  manuscript: PropTypes.shape({
    meta: PropTypes.shape({
      notes: PropTypes.arrayOf(
        PropTypes.shape({
          notesType: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
        }).isRequired,
      ),
    }).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        storedObjects: PropTypes.arrayOf(PropTypes.object),
        tags: PropTypes.arrayOf(PropTypes.string.isRequired),
      }).isRequired,
    ),
  }),
  showEditorOnlyFields: PropTypes.bool,
}

ReadonlyFormTemplate.defaultProps = {
  manuscript: null,
  showEditorOnlyFields: false,
}

export default ReadonlyFormTemplate
