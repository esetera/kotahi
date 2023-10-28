const typeDefs = `
  input FormInput {
    id: ID!
    created: DateTime
    updated: DateTime
    structure: FormStructureInput!
    category: String!
    groupId: ID!
  }

  input CreateFormInput {
    created: DateTime
    structure: FormStructureInput!
    category: String!
    groupId: ID!
  }

  input FormStructureInput {
    name: String
    purpose: String
    description: String
    haspopup: String!
    popuptitle: String
    popupdescription: String
    children: JSON!
  }

  type Form {
    id: ID!
    created: DateTime!
    updated: DateTime
    isActive: Boolean!
    structure: FormStructure!
    category: String!
    groupId: ID
  }

  type FormStructure {
    name: String
    purpose: String
    description: String
    haspopup: String!
    popuptitle: String
    popupdescription: String
    children: JSON!
  }

  type DeleteFormPayload {
    query: Query
  }

  extend type Query {
    form(formId: ID!): Form
    allFormsInCategory(category: String!, groupId: ID!): [Form!]!
    activeFormInCategory(category: String!, groupId: ID!): Form
    activeFormsInCategory(category: String!, groupId: ID!): [Form!]!
  }

  extend type Mutation {
    createForm(form: CreateFormInput!): Form!
    updateForm(form: FormInput!): Form!
    updateFormElement(element: JSON!, formId: ID!, parentElementId: ID): Form!
    deleteFormElement(formId: ID!, elementId: ID!): Form
    deleteForm(formId: ID!): DeleteFormPayload
  }
`

module.exports = typeDefs
