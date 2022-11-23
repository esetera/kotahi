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
status
meta {
  manuscriptId
  title
  history {
    type
    date
  }
}
submission
created
updated
published
hasOverdueTasksForUser
`

const formForPurposeAndCategoryFragment = `formForPurposeAndCategory(purpose: "submit", category: "submission") {
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
`

export default {
  dashboard: gql`
    query Dashboard($wantedRoles: [String]!) {
      currentUser {
        id
        username
        admin
        recentTab
      }
      manuscriptsUserHasCurrentRoleIn(wantedRoles: $wantedRoles) {
        manuscriptVersions {
          ${manuscriptFragment}
          parentId
        }
        ${manuscriptFragment}
      }
      ${formForPurposeAndCategoryFragment}
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
