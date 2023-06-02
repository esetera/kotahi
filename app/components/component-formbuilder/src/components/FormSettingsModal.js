import React from 'react'
import PropTypes from 'prop-types'
import { omitBy } from 'lodash'
import styled from 'styled-components'
import { TextField } from '@pubsweet/ui'
import { th, grid } from '@pubsweet/ui-toolkit'
import { Formik } from 'formik'
import { AbstractField, RadioBox } from './builderComponents'
import { ActionButton } from '../../../shared'
import ValidatedField from '../../../component-submit/src/components/ValidatedField'
import Modal from '../../../component-modal/src/Modal'

const InvalidWarning = styled.div`
  color: ${th('colorError')};
`

export const Legend = styled.div`
  font-size: ${th('fontSizeBase')};
  font-weight: 600;
  margin-bottom: ${({ space, theme }) => space && theme.gridUnit};
`

export const Section = styled.div`
  margin: ${grid(4)} 0;

  &:first-child {
    margin-top: 0;
  }
`

const prepareForSubmit = (form, values) => {
  const cleanedValues = omitBy(values, value => value === '')

  const { created, updated, ...rest } = cleanedValues

  const updatedForm = {
    id: form.id,
    purpose: form.purpose,
    category: form.category,
    structure: rest,
  }

  return updatedForm
}

const FormSettingsModal = ({ form, isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null // To ensure Formik gets new initialValues whenever this is reopened

  return (
    <Formik
      initialValues={{
        description: '',
        popupdescription: '',
        ...form.structure,
      }}
      key={form.id}
      onSubmit={(values, actions) => {
        onSubmit(prepareForSubmit(form, values))
        actions.resetForm()
        onClose()
      }}
      validate={values => {
        if (!values.name) return 'Please give the form a name.'
        return null
      }}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            contentStyles={{ minWidth: '800px' }}
            isOpen={isOpen}
            leftActions={
              !!Object.keys(errors).length && (
                <InvalidWarning>Give the form a title</InvalidWarning>
              )
            }
            onClose={onClose}
            rightActions={
              <>
                <ActionButton onClick={handleSubmit} primary type="submit">
                  {form.id ? 'Update Form' : 'Create Form'}
                </ActionButton>
                <ActionButton onClick={onClose}>Cancel</ActionButton>
              </>
            }
            shouldCloseOnOverlayClick={false}
            title={
              form.id ? `Update Form: ${form.structure.name}` : 'Create Form'
            }
          >
            <Section id="form.name" key="form.name">
              <Legend>Form title</Legend>
              <ValidatedField
                autoFocus={!form.id}
                component={TextField}
                name="name"
                required
              />
            </Section>
            <Section id="form.description" key="form.description">
              <Legend>Description</Legend>
              <ValidatedField
                component={AbstractField}
                name="description"
                onChange={val => {
                  setFieldValue('description', val)
                }}
              />
            </Section>
            <Section id="form.submitpopup" key="form.submitpopup">
              <Legend>Show confirmation page when submitting?</Legend>
              <ValidatedField
                component={RadioBox}
                inline
                name="haspopup"
                onChange={(input, value) => {
                  setFieldValue('haspopup', input)
                }}
                options={[
                  {
                    label: 'Yes',
                    value: 'true',
                  },
                  {
                    label: 'No',
                    value: 'false',
                  },
                ]}
              />
            </Section>
            {values.haspopup === 'true' && [
              <Section id="popup.title" key="popup.title">
                <Legend>Popup Title</Legend>
                <ValidatedField component={TextField} name="popuptitle" />
              </Section>,
              <Section id="popup.description" key="popup.description">
                <Legend>Description</Legend>
                <ValidatedField
                  component={AbstractField}
                  name="popupdescription"
                  onChange={val => {
                    setFieldValue('popupdescription', val)
                  }}
                />
              </Section>,
            ]}
          </Modal>
        </form>
      )}
    </Formik>
  )
}

FormSettingsModal.propTypes = {
  form: PropTypes.shape({
    purpose: PropTypes.string.isRequired,
    id: PropTypes.string,
    structure: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      haspopup: PropTypes.string.isRequired,
      popuptitle: PropTypes.string,
    }),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

FormSettingsModal.defaultProps = {
  isOpen: false,
}

export default FormSettingsModal
