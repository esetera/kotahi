import React, { useContext } from 'react'
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import {
  Grid,
  FullWaxEditorGrid,
  ProductionEditorDiv,
  ReadOnlyEditorWithCommentsEditor,
  Menu,
  InfoContainer,
  FullEditorContainer,
} from './EditorStyles'
import {
  NotesAreaContainer,
  ReadOnlyNotesAreaContainer,
  NotesContainer,
  NotesHeading,
} from './NotesStyles'
import {
  FullCommentsContainer,
  CommentsContainerNotes,
  CommentTrackToolsContainer,
  CommentTrackTools,
  CommentTrackOptions,
} from './CommentsStyles'

const getNotes = main => {
  const notes = DocumentHelpers.findChildrenByType(
    main.state.doc,
    main.state.schema.nodes.footnote,
    true,
  )

  return notes
}

// eslint-disable-next-line react/prop-types
const FullWaxEditorCommentsLayout = (readOnly, readOnlyComments) => ({
  editor,
}) => {
  const {
    view: { main },
    options,
  } = useContext(WaxContext)

  const TopBar = ComponentPlugin('topBar')
  const WaxOverlays = ComponentPlugin('waxOverlays')
  const NotesArea = ComponentPlugin('notesArea')
  const RightArea = ComponentPlugin('rightArea')
  const CounterInfo = ComponentPlugin('BottomRightInfo')
  const CommentTrackToolBar = ComponentPlugin('commentTrackToolBar')

  const notes = (main && getNotes(main)) ?? []

  // added to bring in comments

  const commentsTracksCount =
    main && DocumentHelpers.getCommentsTracksCount(main)

  const trackBlockNodesCount =
    main && DocumentHelpers.getTrackBlockNodesCount(main)

  // added to bring in full screen

  let fullScreenStyles = {}

  if (options.fullScreen) {
    fullScreenStyles = {
      backgroundColor: '#fff',
      height: '100%',
      left: '0',
      margin: '0',
      padding: '0',
      position: 'fixed',
      top: '0',
      width: '100%',
      zIndex: '99999',
    }
  }

  return (
    <div style={fullScreenStyles}>
      <Grid readonly={readOnly} readOnlyComments={readOnlyComments}>
        {readOnly ? (
          <FullWaxEditorGrid useComments>
            <ReadOnlyEditorWithCommentsEditor
              readOnlyComments={readOnlyComments}
            >
              {editor}
            </ReadOnlyEditorWithCommentsEditor>
            <FullCommentsContainer readOnlyComments={readOnlyComments}>
              <CommentTrackToolsContainer>
                <CommentTrackTools>
                  {commentsTracksCount + trackBlockNodesCount} COMMENTS AND
                  SUGGESTIONS
                  <CommentTrackOptions>
                    <CommentTrackToolBar />
                  </CommentTrackOptions>
                </CommentTrackTools>
              </CommentTrackToolsContainer>
              <RightArea area="main" />
            </FullCommentsContainer>
            {notes.length > 0 && (
              <ReadOnlyNotesAreaContainer>
                <NotesHeading>Notes</NotesHeading>
                <NotesContainer id="notes-container">
                  <NotesArea view={main} />
                </NotesContainer>
              </ReadOnlyNotesAreaContainer>
            )}
            <WaxOverlays />
            <InfoContainer>
              <CounterInfo />
            </InfoContainer>
          </FullWaxEditorGrid>
        ) : (
          <>
            <Menu>
              <TopBar />
            </Menu>
            <ProductionEditorDiv className="wax-surface-scroll">
              <FullEditorContainer>{editor}</FullEditorContainer>
              <FullCommentsContainer readOnlyComments={readOnlyComments}>
                <CommentTrackToolsContainer>
                  <CommentTrackTools>
                    {commentsTracksCount + trackBlockNodesCount} COMMENT
                    {commentsTracksCount + trackBlockNodesCount !== 1
                      ? 'S AND SUGGESTIONS'
                      : ' OR SUGGESTION'}
                    <CommentTrackOptions>
                      <CommentTrackToolBar />
                    </CommentTrackOptions>
                  </CommentTrackTools>
                </CommentTrackToolsContainer>
                <RightArea area="main" />
              </FullCommentsContainer>
            </ProductionEditorDiv>
            {notes.length > 0 && (
              <NotesAreaContainer>
                <NotesHeading>Notes</NotesHeading>
                <NotesContainer id="notes-container">
                  <NotesArea view={main} />
                </NotesContainer>
                <CommentsContainerNotes readOnlyComments={readOnlyComments}>
                  <RightArea area="notes" />
                </CommentsContainerNotes>
              </NotesAreaContainer>
            )}
            <WaxOverlays />
            <InfoContainer>
              <CounterInfo />
            </InfoContainer>
          </>
        )}
      </Grid>
    </div>
  )
}

export default FullWaxEditorCommentsLayout
