import { gql } from '@apollo/client'

const manuscriptFragment = `
id
shortId
teams {
  id
  role
  name
  members {
    id
    user {
      id
      username
    }
    status
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
status
meta {
  manuscriptId
  title
  articleSections
  articleType
  history {
    type
    date
  }
}
submission
published
`

export default {
  dashboard: gql`
    query Dashboard($sort: ManuscriptsSort, $filters: [ManuscriptsFilter!]!, $offset: Int, $limit: Int, $timezoneOffsetMinutes: Int) {
      currentUser {
        id
        username
        admin
      }
      manuscriptsUserHasCurrentRoleIn(
        sort: $sort
        filters: $filters
        offset: $offset
        limit: $limit
        timezoneOffsetMinutes: $timezoneOffsetMinutes)
        {
          totalCount
          manuscripts {

            manuscriptVersions {
              ${manuscriptFragment}
              parentId
            }
            ${manuscriptFragment}
            searchSnippet
          }
        }
    
    }
  `,
  getUser: gql`
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        username
        admin
        teams {
          id
        }
      }
    }
  `,
}
