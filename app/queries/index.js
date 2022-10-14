import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      profilePicture
      username
      admin
      email
      defaultIdentity {
        identifier
        email
        type
        aff
        id
      }
      isOnline
      _currentRoles {
        id
        roles
      }
      teams {
        id
        objectId
        objectType
        members {
          status
          user {
            id
          }
        }
      }
    }
  }
`

export const GET_USER = gql`
  query user($id: ID, $username: String) {
    user(id: $id, username: $username) {
      id
      username
      profilePicture
      isOnline
      email
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation createMessage($content: String, $channelId: String) {
    createMessage(content: $content, channelId: $channelId) {
      content
      user {
        username
      }
    }
  }
`

export const GET_BLACKLIST_INFORMATION = gql`
  query getBlacklistInformation($email: String) {
    getBlacklistInformation(email: $email) {
      id
    }
  }
`

export const ADD_EMAIL_TO_BLACKLIST = gql`
  mutation($email: String!) {
    addEmailToBlacklist(email: $email) {
      email
    }
  }
`

export const GET_MESSAGE_BY_ID = gql`
  query messageById($messageId: ID) {
    message(messageId: $messageId) {
      id
      content
      user {
        username
        profilePicture
      }
    }
  }
`

export const SEARCH_USERS = gql`
  query searchUsers($teamId: ID, $query: String) {
    searchUsers(teamId: $teamId, query: $query) {
      id
      username
      profilePicture
      isOnline
    }
  }
`

export const ARCHIVE_MANUSCRIPT = gql`
  mutation($id: ID!) {
    archiveManuscript(id: $id)
  }
`

export const ARCHIVE_MANUSCRIPTS = gql`
  mutation($ids: [ID!]!) {
    archiveManuscripts(ids: $ids)
  }
`

export const DELETE_MANUSCRIPT = gql`
  mutation($id: ID!) {
    deleteManuscript(id: $id)
  }
`

export const DELETE_MANUSCRIPTS = gql`
  mutation($ids: [ID]!) {
    deleteManuscripts(ids: $ids)
  }
`

export const GET_MANUSCRIPTS_AND_FORM = gql`
  query Manuscripts(
    $sort: ManuscriptsSort
    $filters: [ManuscriptsFilter!]!
    $offset: Int
    $limit: Int
    $timezoneOffsetMinutes: Int
  ) {
    paginatedManuscripts(
      sort: $sort
      filters: $filters
      offset: $offset
      limit: $limit
      timezoneOffsetMinutes: $timezoneOffsetMinutes
    ) {
      totalCount
      manuscripts {
        id
        shortId
        meta {
          manuscriptId
          title
        }
        submission
        created
        updated
        status
        published
        teams {
          id
          role
          members {
            id
            user {
              id
              username
            }
          }
        }
        importSourceServer
        manuscriptVersions {
          id
          shortId
          meta {
            manuscriptId
            title
          }
          submission
          created
          updated
          status
          published
          teams {
            id
            role
            members {
              id
              user {
                defaultIdentity {
                  identifier
                }
                id
                username
              }
            }
          }
          submitter {
            username
            isOnline
            defaultIdentity {
              id
              identifier
              name
            }
            id
            profilePicture
          }
          importSourceServer
        }
        submitter {
          username
          isOnline
          defaultIdentity {
            id
            identifier
            name
          }
          id
          profilePicture
        }
        searchSnippet
      }
    }

    formForPurposeAndCategory(purpose: "submit", category: "submission") {
      structure {
        children {
          id
          component
          name
          title
          shortDescription
          validate {
            id
            label
            value
            labelColor
          }
          validateValue {
            minChars
            maxChars
            minSize
          }
          doiValidation
          options {
            id
            label
            labelColor
            value
          }
        }
      }
    }
  }
`

export const IMPORT_MANUSCRIPTS = gql`
  mutation {
    importManuscripts
  }
`

export const IMPORTED_MANUSCRIPTS_SUBSCRIPTION = gql`
  subscription manuscriptsImportStatus {
    manuscriptsImportStatus
  }
`

export const GET_SYSTEM_WIDE_DISCUSSION_CHANNEL = gql`
  query {
    systemWideDiscussionChannel {
      id
    }
  }
`
