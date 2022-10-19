import {
  DefaultField,
  NewItemCheckbox,
  TitleWithAbstractAsTooltip,
  FilterableStatusBadge,
  LabelsOrSelectButton,
  Submitter,
  Editors,
  Actions,
} from '../cell-components'

/**
 * @typedef {Object} ComponentValues
 * @param {string} urlFrag Action Button: The top level urlFrag, e.g. 'kotahi'
 * @param {function} deleteManuscript Action Button: A function that deletes a manuscript
 * @param {function} isManuscriptBlockedFromPublishing Action Button: Function if a manuscript can be published
 * @param {function} tryPublishManuscript Action Button: A function that publishes a manuscript
 * @param {Array[object]} selectedNewManuscripts newItem Checkbox: The list of selected manuscripts
 * @param {function} toggleNewManuscriptCheck newItem Checkbox: A callback to toggle a manuscript
 * @param {function} setReadyToEvaluateLabel submission label: If submission is ready to be evaluated
 */

/**
 * buildSpecialColumnProps: Build the special components for specific form fields
 * @param {ComponentValues} specialComponentValues values needed for specific components
 * @returns {object} The built special components
 */

const buildSpecialColumnProps = specialComponentValues => {
  const {
    deleteManuscript,
    isManuscriptBlockedFromPublishing,
    tryPublishManuscript,
    urlFrag,
    selectedNewManuscripts,
    toggleNewManuscriptCheck,
    setReadyToEvaluateLabel,
  } = specialComponentValues

  const specialColumnProps = {
    shortId: {
      title: 'Manuscript number',
      canSort: true,
      defaultSortDirection: 'DESC',
      flex: '0 1 6em',
    },
    created: {
      title: 'Created',
      canSort: true,
      defaultSortDirection: 'DESC',
      flex: '0 1 7em',
    },
    updated: {
      title: 'Updated',
      canSort: true,
      defaultSortDirection: 'DESC',
      flex: '0 1 7em',
    },
    status: {
      title: 'Status',
      filterOptions:
        process.env.INSTANCE_NAME === 'aperture'
          ? [
              { label: 'Unsubmitted', value: 'new' },
              { label: 'Submitted', value: 'submitted' },
              { label: 'Accepted', value: 'accepted' },
              { label: 'Rejected', value: 'rejected' },
              { label: 'Revise', value: 'revise' },
              { label: 'Revising', value: 'revising' },
              { label: 'Published', value: 'published' },
            ]
          : [
              { label: 'Unsubmitted', value: 'new' },
              { label: 'Submitted', value: 'submitted' },
              { label: 'Evaluated', value: 'evaluated' },
              { label: 'Published', value: 'published' },
            ],
      flex: '0 1 10em',
      component: FilterableStatusBadge,
    },
    author: { title: 'Author', flex: '0 1 16em', component: Submitter },
    editor: { title: 'Editor', flex: '0 1 12em', component: Editors },
    actions: {
      flex: '0 1 6em',
      component: Actions,
      extraProps: {
        deleteManuscript,
        isManuscriptBlockedFromPublishing,
        tryPublishManuscript,
        urlFrag,
      },
    },
    newItemCheckbox: {
      flex: '0 1 2em',
      component: NewItemCheckbox,
      extraProps: { selectedNewManuscripts, toggleNewManuscriptCheck },
    },
    'submission.topics': { flex: '0 1 10em' },
    'submission.labels': {
      flex: '0 1 10em',
      extraProps: { setReadyToEvaluateLabel },
      component: ['ncrc', 'colab'].includes(process.env.INSTANCE_NAME)
        ? LabelsOrSelectButton
        : DefaultField,
    },
    'submission.label': { flex: '0.2 1 10em' },
    'submission.journal': { flex: '0.2 1 12em' },
    'submission.articleDescription': {
      component:
        process.env.INSTANCE_NAME === 'ncrc'
          ? TitleWithAbstractAsTooltip
          : DefaultField,
    },
    'meta.title': {
      component:
        process.env.INSTANCE_NAME === 'colab'
          ? TitleWithAbstractAsTooltip
          : DefaultField,
    },
  }

  return specialColumnProps
}

export default buildSpecialColumnProps