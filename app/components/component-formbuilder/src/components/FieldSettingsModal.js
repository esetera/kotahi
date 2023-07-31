import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty, omitBy } from 'lodash'
import { Formik } from 'formik'
import { th } from '@pubsweet/ui-toolkit'
import { v4 as uuid } from 'uuid'
import ValidatedField from '../../../component-submit/src/components/ValidatedField'
import { fieldTypes, submissionFieldTypes } from './config/Elements'
import * as elements from './builderComponents'
import { Section, Legend, DetailText } from './style'
import Modal from '../../../component-modal/src/Modal'
import { ActionButton, Select } from '../../../shared'

const InvalidWarning = styled.div`
  color: ${th('colorError')};
`

const getSettableComponentProperties = (
  component,
  shouldAllowHypothesisTagging,
) =>
  Object.entries(component).filter(
    ([key]) => key !== 'publishingTag' || shouldAllowHypothesisTagging,
  )

const FieldSettingsModal = ({
  category,
  field,
  onSubmit,
  shouldAllowHypothesisTagging,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null // To ensure Formik gets new initialValues whenever this is reopened
  if (!field) return null
  const [componentType, setComponentType] = useState(field.component)

  let componentTypeOptions =
    category === 'submission' ? submissionFieldTypes : fieldTypes

  // Disable ThreadedDiscussion in submission and review forms
  if (['submission', 'review'].includes(category))
    componentTypeOptions = componentTypeOptions.filter(
      o => o.value !== 'ThreadedDiscussion',
    )
  // Disable ManuscriptFile in review and decision forms
  if (['review', 'decision'].includes(category))
    componentTypeOptions = componentTypeOptions.filter(
      o => o.value !== 'ManuscriptFile',
    )

  const component =
    componentTypeOptions.find(x => x.value === componentType)?.properties || {}

  const editableProperties = getSettableComponentProperties(
    component,
    shouldAllowHypothesisTagging,
  ).filter(([key, value]) => value.component !== 'Hidden')

  const defaults = {}
  Object.entries(component).forEach(([key, value]) => {
    const defaultValue = value?.defaultValue
    if (defaultValue !== undefined) defaults[key] = defaultValue
  })

  return (
    <Formik
      initialValues={{
        ...defaults,
        ...field,
      }}
      key={field.id}
      onSubmit={(values, actions) => {
        onSubmit(prepareForSubmit(values))
        actions.resetForm()
        onClose()
      }}
    >
      {({ errors, handleSubmit, setFieldValue, values }) => {
        const populateDefaultValues = compType => {
          const comp =
            componentTypeOptions.find(x => x.value === compType)?.properties ||
            {}

          getSettableComponentProperties(
            comp,
            shouldAllowHypothesisTagging,
          ).forEach(([key, value]) => {
            if (value.defaultValue) setFieldValue(key, value.defaultValue)
          })
        }

        const formIsValid = !Object.keys(errors).length

        return (
          <form onSubmit={handleSubmit}>
            <Modal
              contentStyles={{ minWidth: '800px' }}
              isOpen={isOpen}
              leftActions={
                !formIsValid && (
                  <InvalidWarning>
                    Correct invalid values before saving
                  </InvalidWarning>
                )
              }
              onClose={onClose}
              rightActions={
                <>
                  <ActionButton onClick={handleSubmit} primary type="submit">
                    Save
                  </ActionButton>
                  <ActionButton onClick={onClose}>Cancel</ActionButton>
                </>
              }
              shouldCloseOnOverlayClick={false}
              title="Field Properties"
            >
              <Section>
                <Legend space>Field type</Legend>
                <ValidatedField
                  component={Select}
                  hasGroupedOptions
                  name="component"
                  onChange={option => {
                    setComponentType(option.value)
                    setFieldValue('component', option.value)
                    populateDefaultValues(option.value)
                  }}
                  options={
                    /* componentTypeOptions */ [
                      {
                        label: 'Standard fields',
                        options: componentTypeOptions.filter(x => !x.isCustom),
                      },
                      {
                        label: 'Custom field types',
                        options: componentTypeOptions.filter(x => x.isCustom),
                      },
                    ]
                  }
                  required
                />
              </Section>
              {editableProperties.map(([key, value]) => {
                return (
                  <Section key={key}>
                    <Legend space>
                      {value.props?.label ?? `Field ${key}`}
                    </Legend>
                    <ValidatedField
                      component={elements[value.component]}
                      name={key}
                      onChange={val => {
                        if (isEmpty(val)) {
                          setFieldValue(key, null)
                          return
                        }

                        setFieldValue(key, val.target ? val.target.value : val)
                      }}
                      required={key === 'name' || key === 'title'}
                      {...{
                        ...value.props,
                        label: undefined,
                        description: undefined,
                      }}
                    />
                    {value.props?.description && (
                      <DetailText>{value.props.description}</DetailText>
                    )}
                  </Section>
                )
              })}
            </Modal>
          </form>
        )
      }}
    </Formik>
  )
}

FieldSettingsModal.propTypes = {
  category: PropTypes.oneOf(['submission', 'review', 'decision']).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

FieldSettingsModal.defaultProps = {}

const prepareForSubmit = values => {
  const cleanedValues = omitBy(values, value => value === '')
  if (
    cleanedValues.component !== 'Select' &&
    cleanedValues.component !== 'CheckboxGroup' &&
    cleanedValues.component !== 'RadioGroup'
  )
    cleanedValues.options = undefined

  cleanedValues.options = cleanedValues.options?.map(x => ({
    id: uuid(),
    ...x,
  }))
  cleanedValues.validate = cleanedValues.validate?.map(x => ({
    id: uuid(),
    ...x,
  }))

  return cleanedValues
}

export default FieldSettingsModal
