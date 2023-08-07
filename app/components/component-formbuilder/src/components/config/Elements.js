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
    label: 'Hypothesis tag',
    description:
      'You may specify a tag to use when sharing this field as a Hypothesis annotation.',
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

const presetTextField = name => ({
  component: 'Hidden',
  defaultValue: name,
})

const parseField = {
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
}

const formatField = {
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
}

const doiValidationField = {
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
}

const prototypeComponent = category => ({
  id: hiddenfield,
  title: requiredTextField,
  name: category === 'submission' ? submissionNameField : nameField,
  shortDescription: shortDescriptionField,
  description: editorfield,
  validate: validateOther,
  hideFromAuthors: hideFromAuthorsField,
  hideFromReviewers: hideFromReviewersField,
  permitPublishing: permitPublishingField,
  publishingTag: publishingTagField,
})

/** All properties from all components must appear in this list, to establish correct order of display */
const propertiesOrder = [
  'id',
  'title',
  'name',
  'options',
  'placeholder',
  'shortDescription',
  'description',
  'inline',
  'sectioncss',
  'validate',
  'parse',
  'format',
  'doiValidation', // TODO incorporate into validation
  'doiUniqueSuffixValidation', // TODO incorporate into validation
  'hideFromAuthors',
  'hideFromReviewers',
  'permitPublishing',
  'publishingTag',
]

const getBaseComponentProperties = category => ({
  ManuscriptFile: {
    ...prototypeComponent(category),
    label: 'Attached manuscript',
    validate: undefined,
    permitPublishing: undefined,
    publishingTag: undefined,
  },
  SupplementaryFiles: {
    ...prototypeComponent(category),
    label: 'Attachments',
    permitPublishing: undefined,
    publishingTag: undefined,
  },
  VisualAbstract: {
    ...prototypeComponent(category),
    label: 'Single image attachment',
    permitPublishing: undefined,
    publishingTag: undefined,
  },
  AuthorsInput: {
    ...prototypeComponent(category),
    label: 'List of contributors',
  },
  LinksInput: {
    ...prototypeComponent(category),
    label: 'List of links (URLs)',
    validate: validateCollection,
  },
  AbstractEditor: {
    ...prototypeComponent(category),
    label: 'Rich text',
    placeholder: textfield,
    validate: validateText,
  },
  ThreadedDiscussion: {
    ...prototypeComponent(category),
    label: 'Discussion',
  },
  TextField: {
    ...prototypeComponent(category),
    label: 'Text',
    placeholder: textfield,
    validate: validateText,
    parse: parseField,
    format: formatField,
    doiValidation: doiValidationField,
    doiUniqueSuffixValidation: doiUniqueSuffixValidationField,
  },
  CheckboxGroup: {
    ...prototypeComponent(category),
    label: 'Checkboxes',
    options: optionfield,
    validate: validateCollection,
  },
  Select: {
    ...prototypeComponent(category),
    label: 'Dropdown selection',
    placeholder: textfield,
    options: optionfield,
  },
  RadioGroup: {
    ...prototypeComponent(category),
    label: 'Radio buttons',
    options: optionfield,
    inline: radiofield,
    sectioncss: textarea,
  },
})

const genericFieldOptions = [
  { isCustom: true, fieldType: 'text', component: 'TextField' },
  {
    isCustom: true,
    fieldType: 'richText',
    component: 'AbstractEditor',
  },
  { isCustom: true, fieldType: 'select', component: 'Select' },
  { isCustom: true, fieldType: 'radioGroup', component: 'RadioGroup' },
  {
    isCustom: true,
    fieldType: 'checkboxes',
    component: 'CheckboxGroup',
  },
  {
    isCustom: true,
    fieldType: 'contributors',
    component: 'AuthorsInput',
  },
  { isCustom: true, fieldType: 'links', component: 'LinksInput' },
]

const submissionFieldOptions = [
  {
    fieldType: 'title',
    label: 'Title',
    component: 'TextField',
    title: requiredTextFieldWithDefault('Title'),
    name: presetTextField('meta.title'),
  },
  {
    fieldType: 'authors',
    label: 'Authors',
    component: 'AuthorsInput',
    title: requiredTextFieldWithDefault('Authors'),
    name: presetTextField('submission.authors'),
  },
  {
    fieldType: 'abstract',
    label: 'Abstract',
    component: 'AbstractEditor',
    title: requiredTextFieldWithDefault('Abstract'),
    name: presetTextField('meta.abstract'),
  },
  {
    fieldType: 'visualAbstract',
    label: 'VisualAbstract',
    component: 'VisualAbstract',
    title: requiredTextFieldWithDefault('Visual abstract'),
    name: presetTextField('visualAbstract'),
  },
  {
    fieldType: 'keywords',
    label: 'Keywords',
    component: 'TextField',
    title: requiredTextFieldWithDefault('Keywords'),
    name: presetTextField('submission.keywords'),
  },
  {
    fieldType: 'attachments',
    label: 'Attachments',
    component: 'SupplementaryFiles',
    title: requiredTextFieldWithDefault('Attachments'),
    name: presetTextField('fileName'),
  },
  {
    fieldType: 'doi',
    label: 'DOI',
    component: 'TextField',
    title: requiredTextFieldWithDefault('DOI'),
    name: presetTextField('submission.doi'),
    doiValidation: { ...doiValidationField, defaultValue: 'true' },
    doiUniqueSuffixValidation: null,
    parse: null,
    format: null,
    validate: validateOther,
  },
  {
    fieldType: 'attachedManuscript',
    label: 'Attached manuscript',
    component: 'ManuscriptFile',
    title: requiredTextFieldWithDefault('Attached manuscript'),
    name: presetTextField('manuscriptFile'),
  },
  ...genericFieldOptions,
]

const decisionFieldOptions = [
  {
    fieldType: 'verdict',
    label: 'Verdict',
    component: 'RadioGroup',
    title: requiredTextFieldWithDefault('Decision'),
    name: presetTextField('verdict'),
  },
  {
    isCustom: true,
    fieldType: 'discussion',
    component: 'ThreadedDiscussion',
  },
  ...genericFieldOptions,
]

const reviewFieldOptions = [
  {
    fieldType: 'verdict',
    label: 'Verdict',
    component: 'RadioGroup',
    title: requiredTextFieldWithDefault('Recommended action'),
    name: presetTextField('verdict'),
  },
  ...genericFieldOptions,
]

const getFieldOptions = formCategory => {
  let opts = []
  if (formCategory === 'submission') opts = submissionFieldOptions
  else if (formCategory === 'decision') opts = decisionFieldOptions
  else if (formCategory === 'review') opts = reviewFieldOptions

  const result = []

  opts.forEach(opt => {
    const baseProps =
      getBaseComponentProperties(formCategory)[opt.component] || {}

    const props = {}
    propertiesOrder.forEach(propName => {
      if (opt[propName] === null) return // to skip the property
      if (opt[propName] || baseProps[propName])
        props[propName] = opt[propName] || baseProps[propName]
    })
    result.push({
      fieldType: opt.fieldType,
      component: opt.component,
      label: opt.label || baseProps.label,
      isCustom: opt.isCustom,
      value: opt.fieldType, // To work with Submit component
      props,
    })
  })

  return result
}

const fieldOptionsByCategory = {
  submission: getFieldOptions('submission'),
  decision: getFieldOptions('decision'),
  review: getFieldOptions('review'),
}

const getFieldOptionByNameOrComponent = (name, component, category) => {
  const fieldOptions = fieldOptionsByCategory[category] || []

  return (
    fieldOptions.find(opt => name && name === opt.props.name?.defaultValue) ||
    fieldOptions.find(opt => opt.isCustom && component === opt.component)
  )
}

export { fieldOptionsByCategory, getFieldOptionByNameOrComponent }
