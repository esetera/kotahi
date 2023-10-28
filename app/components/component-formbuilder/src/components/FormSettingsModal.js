import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { omitBy } from 'lodash'
import styled from 'styled-components'
import { TextField } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { Formik } from 'formik'
import { AbstractField, RadioBox } from './builderComponents'
import { ActionButton } from '../../../shared'
import ValidatedField from '../../../component-submit/src/components/ValidatedField'
import Modal from '../../../component-modal/src/Modal'
import { ConfirmationModal } from '../../../component-modal/src/ConfirmationModal'
import { DetailText, Section, Legend } from './style'

const InvalidWarning = styled.div`
  color: ${th('colorError')};
`

const FloatRightButton = styled(ActionButton)`
  float: right;
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const prepareForSubmit = (form, values) => {
  const cleanedValues = omitBy(values, value => value === '')

  const { created, updated, ...rest } = cleanedValues

  const updatedForm = {
    id: form.id,
    category: form.category,
    structure: rest,
  }

  return updatedForm
}

const FormSettingsModal = ({
  form,
  isOpen,
  makeFormActive,
  makeFormInactive,
  onClose,
  onSubmit,
}) => {
  const [isConfirmingMakeActive, setIsConfirmingMakeActive] = useState(false)

  const [isConfirmingMakeInactive, setIsConfirmingMakeInactive] = useState(
    false,
  )

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
        if (!values.name) return ['Please give the form a name.']
        if (form.category === 'submission' && !values.purpose)
          return ['Please choose a purpose identifier.']
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
                <InvalidWarning>{errors.join(' — ')}</InvalidWarning>
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
            {!form.isActive && (
              <FloatRightButton
                isCompact
                onClick={() => setIsConfirmingMakeActive(true)}
              >
                {form.category === 'submission'
                  ? 'Make this form active'
                  : 'Make this the active form'}
              </FloatRightButton>
            )}
            {form.isActive && form.category === 'submission' && (
              <FloatRightButton
                isCompact
                onClick={() => setIsConfirmingMakeInactive(true)}
              >
                Make this form inactive
              </FloatRightButton>
            )}

            <Section id="form.name" key="form.name">
              <Legend>Form title</Legend>
              <ValidatedField
                autoFocus={!form.id}
                component={TextField}
                name="name"
                required
              />
            </Section>
            {form.category === 'submission' && (
              <Section id="form.purpose" key="form.purpose">
                <Legend>Form purpose identifier</Legend>
                <ValidatedField component={TextField} name="purpose" required />
                <DetailText>
                  Choose a name that will not change, to uniquely distinguish
                  what type of submission this form is for. (Internal use only.)
                </DetailText>
              </Section>
            )}
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
            <ConfirmationModal
              closeModal={() => setIsConfirmingMakeActive(false)}
              confirmationAction={makeFormActive}
              confirmationButtonText="Confirm"
              isOpen={isConfirmingMakeActive}
              message={`Make this the active ${form.category} form?`}
            />
            <ConfirmationModal
              closeModal={() => setIsConfirmingMakeInactive(false)}
              confirmationAction={makeFormInactive}
              confirmationButtonText="Confirm"
              isOpen={isConfirmingMakeInactive}
              message={`Remove this from active ${form.category} forms?`}
            />
          </Modal>
        </form>
      )}
    </Formik>
  )
}

FormSettingsModal.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string,
    structure: PropTypes.shape({
      name: PropTypes.string,
      purpose: PropTypes.string,
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
