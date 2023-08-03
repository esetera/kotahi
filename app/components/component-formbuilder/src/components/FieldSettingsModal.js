import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty, omitBy } from 'lodash'
import { Formik } from 'formik'
import { th } from '@pubsweet/ui-toolkit'
import { v4 as uuid } from 'uuid'
import ValidatedField from '../../../component-submit/src/components/ValidatedField'
import {
  fieldOptionsByCategory,
  getFieldOptionByNameOrComponent,
} from './config/Elements'
import * as elements from './builderComponents'
import { Section, Legend, DetailText } from './style'
import Modal from '../../../component-modal/src/Modal'
import { ActionButton, Select } from '../../../shared'

const InvalidWarning = styled.div`
  color: ${th('colorError')};
`

const filterOutPropsDisabledByConfig = (
  fieldOpts,
  shouldAllowHypothesisTagging,
) =>
  fieldOpts.map(opt => {
    const props = Object.fromEntries(
      Object.entries(opt.props).filter(
        ([key]) => key !== 'publishingTag' || shouldAllowHypothesisTagging,
      ),
    )

    return { ...opt, props }
  })

const getDefaults = fieldOption =>
  Object.fromEntries(
    Object.entries(fieldOption?.props || {})
      .filter(([key, value]) => value.defaultValue !== undefined)
      .map(([key, value]) => [key, value.defaultValue]),
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

  const fieldOpts = filterOutPropsDisabledByConfig(
    fieldOptionsByCategory[category],
    shouldAllowHypothesisTagging,
  )

  const [fieldType, setFieldType] = useState(
    getFieldOptionByNameOrComponent(field.name, field.component, category)
      ?.fieldType,
  )

  const fieldOption = fieldOpts.find(opt => opt.fieldType === fieldType)
  const defaults = getDefaults(fieldOption)

  const editableProperties = Object.entries(fieldOption?.props || {}).filter(
    ([key, value]) => value.component !== 'Hidden',
  )

  return (
    <Formik
      initialValues={{
        ...defaults,
        ...field,
        fieldType,
      }}
      key={`${field.id},${fieldType},${fieldOption?.component}`}
      onSubmit={(values, actions) => {
        onSubmit(prepareForSubmit(values))
        actions.resetForm()
        onClose()
      }}
    >
      {({ errors, handleSubmit, setFieldValue, values }) => {
        const populateDefaultValues = newFieldType => {
          const newFieldOption = fieldOpts.find(
            opt => opt.fieldType === newFieldType,
          )

          const newDefaults = getDefaults(newFieldOption)

          Object.entries(newDefaults).forEach(([key, value]) => {
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
                  name="fieldType"
                  onChange={option => {
                    setFieldType(option.value)
                    setFieldValue('fieldType', option.value)
                    populateDefaultValues(option.value)
                  }}
                  options={[
                    {
                      label: 'Generic field types',
                      options: fieldOpts.filter(x => x.isCustom),
                    },
                    {
                      label: 'Special fields',
                      options: fieldOpts.filter(x => !x.isCustom),
                    },
                  ]}
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
  const cleanedValues = omitBy(
    values,
    (value, key) => value === '' || key === 'fieldType',
  )

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
