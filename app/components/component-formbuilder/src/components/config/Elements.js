import { required } from '../../../../xpub-validators/src'

const hiddenfield = {
  component: 'Hidden',
}

const textfield = {
  component: 'TextField',
}

const optionfield = {
  component: 'OptionsField',
  defaultValue: [],
}

const editorfield = {
  component: 'AbstractField',
  defaultValue: '',
}

const textarea = {
  component: 'TextArea',
  props: {
    cols: 55,
    rows: 5,
  },
}

const requiredTextField = {
  component: 'TextField',
  props: {
    validate: required,
  },
}

const requiredTextFieldWithDefault = defaultValue => ({
  component: 'TextField',
  props: {
    validate: required,
  },
  defaultValue,
})

const shortDescriptionField = {
  component: 'TextField',
  props: { label: 'Short title (optional — used in concise listings)' },
}

// Decision and Review:
// - Don't have meta, but a single jsonData that can accomodate everything
const nameFieldRegex = /^[a-zA-Z]\w*$/

const nameField = {
  component: 'TextField',
  props: {
    label: 'Name (internal field name)',
    validate: val => (nameFieldRegex.test(val) ? null : 'Invalid name'),
  },
}

const submissionNameFieldRegex = /^(?:submission\.[a-zA-Z]\w*|meta.title|meta.abstract|fileName|visualAbstract|manuscriptFile)$/

const submissionNameField = {
  component: 'TextField',
  props: {
    label: 'Name (internal field name)',
    description:
      'Use either "submission.yourFieldNameHere", or one of the following: "meta.title" for manuscript title, "meta.abstract" for abstract, "fileName" for SupplementaryFiles, or "visualAbstract" for a VisualAbstract, or "manuscriptFile" for a ManuscriptFile.',
    validate: val =>
      submissionNameFieldRegex.test(val) ? null : 'Invalid name',
  },
}

const validateText = {
  component: 'Select',
  props: {
    isMulti: true,
    isClearable: true,
    label: 'Validation options',
    options: [
      {
        value: 'required',
        label: 'Required',
      },
      {
        value: 'minChars',
        label: 'Minimum characters',
      },
      {
        value: 'maxChars',
        label: 'Maximum characters',
      },
    ],
  },
}

const validateCollection = {
  component: 'Select',
  props: {
    isMulti: true,
    isClearable: true,
    label: 'Validation options',
    options: [
      {
        value: 'required',
        label: 'Required',
      },
      {
        value: 'minSize',
        label: 'Minimum number of items',
      },
    ],
  },
}

const validateOther = {
  component: 'Select',
  props: {
    isMulti: true,
    isClearable: true,
    label: 'Validation options',
    options: [
      {
        value: 'required',
        label: 'Required',
      },
    ],
  },
}

const radiofield = {
  component: 'RadioBox',
  props: {
    inline: true,
    options: [
      {
        value: 'true',
        label: 'Yes',
      },
      {
        value: 'false',
        label: 'No',
      },
    ],
  },
  defaultValue: 'false',
}

const hideFromReviewersField = {
  component: 'RadioBox',
  props: {
    inline: true,
    options: [
      {
        value: 'true',
        label: 'Yes',
      },
      {
        value: 'false',
        label: 'No',
      },
    ],
    label: 'Hide from reviewers?',
  },
  defaultValue: 'false',
}

const hideFromAuthorsField = {
  component: 'RadioBox',
  props: {
    inline: true,
    options: [
      {
        value: 'true',
        label: 'Yes',
      },
      {
        value: 'false',
        label: 'No',
      },
    ],
    label: 'Hide from authors?',
  },
  defaultValue: 'false',
}

const permitPublishingField = {
  component: 'RadioBox',
  props: {
    options: [
      {
        value: 'false',
        label: 'Never',
      },
      {
        value: 'true',
        label: 'Ad hoc (Editor decides at time of sharing/publishing)',
      },
      {
        value: 'always',
        label: 'Always',
      },
    ],
    label: 'Include when sharing or publishing?',
  },
  defaultValue: 'false',
}

const publishingTagField = {
  component: 'TextField',
  props: {
    label: 'Hypothes.is tag',
    description:
      'You may specify a tag to use when sharing this field as a Hypothes.is annotation.',
  },
}

const doiUniqueSuffixValidationField = {
  component: 'RadioBox',
  props: {
    inline: true,
    options: [
      {
        value: 'true',
        label: 'Yes',
      },
      {
        value: 'false',
        label: 'No',
      },
    ],
    label: 'Validate as a DOI suffix and ensure it is unique?',
  },
  defaultValue: 'false',
}

const presetNameField = name => ({
  component: 'Hidden',
  defaultValue: name,
})

const customFields = {
  ManuscriptFile: {
    label: 'Attached manuscript',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: submissionNameField,
      description: editorfield,
      shortDescription: shortDescriptionField,
      hideFromReviewers: hideFromReviewersField,
      hideFromAuthors: hideFromAuthorsField,
    },
  },
  SupplementaryFiles: {
    label: 'Attachments',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromAuthors: hideFromAuthorsField,
    },
  },
  VisualAbstract: {
    label: 'Single image attachment',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromAuthors: hideFromAuthorsField,
    },
  },
  AuthorsInput: {
    label: 'List of contributors',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  LinksInput: {
    label: 'List of links (URLs)',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateCollection,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  AbstractEditor: {
    label: 'Rich text',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      placeholder: textfield,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateText,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  ThreadedDiscussion: {
    label: 'Discussion',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromReviewers: hideFromReviewersField,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  TextField: {
    label: 'Text',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      placeholder: textfield,
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateText,
      parse: {
        component: 'Select',
        props: {
          label: 'Special parsing',
          options: [
            {
              value: 'false',
              label: 'None',
            },
            {
              value: 'split',
              label: 'Split at commas',
            },
          ],
        },
      },
      format: {
        component: 'Select',
        props: {
          label: 'Special formatting',
          options: [
            {
              value: 'false',
              label: 'None',
            },
            {
              value: 'join',
              label: 'Join with commas',
            },
          ],
        },
      },
      doiValidation: {
        component: 'RadioBox',
        props: {
          inline: true,
          options: [
            {
              value: 'true',
              label: 'Yes',
            },
            {
              value: 'false',
              label: 'No',
            },
          ],
          label: 'Validate as a DOI?',
        },
        defaultValue: 'false',
      },
      doiUniqueSuffixValidation: doiUniqueSuffixValidationField,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  CheckboxGroup: {
    label: 'Checkboxes',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      options: optionfield,
      shortDescription: shortDescriptionField,
      validate: validateCollection,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  Select: {
    label: 'Dropdown selection',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      placeholder: textfield,
      description: editorfield,
      options: optionfield,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  RadioGroup: {
    label: 'Radio buttons',
    isCustom: true,
    properties: {
      id: hiddenfield,
      title: requiredTextField,
      name: nameField,
      description: editorfield,
      options: optionfield,
      inline: radiofield,
      sectioncss: textarea,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromAuthors: hideFromAuthorsField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
}

const submissionStandardFields = {
  Title: {
    label: 'Title',
    properties: {
      id: hiddenfield,
      title: requiredTextFieldWithDefault('Title'),
      name: presetNameField('meta.title'),
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateText,
      hideFromAuthors: hideFromAuthorsField,
      hideFromReviewers: hideFromReviewersField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  Authors: {
    label: 'Authors',
    properties: {
      id: hiddenfield,
      title: requiredTextFieldWithDefault('Authors'),
      name: presetNameField('submission.authors'),
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateOther,
      hideFromAuthors: hideFromAuthorsField,
      hideFromReviewers: hideFromReviewersField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  Abstract: {
    label: 'Abstract',
    properties: {
      id: hiddenfield,
      title: requiredTextFieldWithDefault('Abstract'),
      name: presetNameField('meta.abstract'),
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateText,
      hideFromAuthors: hideFromAuthorsField,
      hideFromReviewers: hideFromReviewersField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
  Keywords: {
    label: 'Keywords',
    properties: {
      id: hiddenfield,
      title: requiredTextFieldWithDefault('Keywords'),
      name: presetNameField('submission.keywords'),
      description: editorfield,
      shortDescription: shortDescriptionField,
      validate: validateText,
      hideFromAuthors: hideFromAuthorsField,
      hideFromReviewers: hideFromReviewersField,
      permitPublishing: permitPublishingField,
      publishingTag: publishingTagField,
    },
  },
}

/** elements for submission form are exactly the same except
 * have different naming rules and add a hideFromReviewers option */
const submissionElements = Object.fromEntries(
  Object.entries(submissionStandardFields).concat(
    Object.entries(customFields).map(([key, value]) => [
      key,
      {
        ...value,
        properties: {
          ...value.properties,
          name: submissionNameField,
          hideFromReviewers: hideFromReviewersField,
        },
      },
    ]),
  ),
)

const fieldOrder = [
  'Title',
  'Authors',
  'Abstract',
  'Keywords',
  'TextField',
  'AbstractEditor',
  'Select',
  'RadioGroup',
  'CheckboxGroup',
  'AuthorsInput',
  'ThreadedDiscussion',
  'LinksInput',
  'SupplementaryFiles',
  'VisualAbstract',
  'ManuscriptFile',
]

const fieldTypes = fieldOrder.map(x => ({
  ...customFields[x],
  value: x,
}))

const submissionFieldTypes = fieldOrder.map(x => ({
  ...submissionElements[x],
  value: x,
}))

export { fieldTypes, submissionFieldTypes }
