import React from 'react'
import { set } from 'lodash'

import { ValidatedFieldFormik } from '@pubsweet/ui'

// import FormWaxEditor from '../../../component-formbuilder/src/components/FormWaxEditor'
// import FullWaxEditor from '../../../wax-collab/src/FullWaxEditor'
import ContentWaxEditor from '../editor/ContentWaxEditor'

import {
  Section,
  Page,
  EditorForm,
  ActionButtonContainer,
  FormTextInput,
  FormActionButton,
} from '../style'

import { hasValue } from '../../../../shared/htmlUtils'

const inputComponents = {
  TextField: FormTextInput,
}

inputComponents.AbstractEditor = ({
  validationStatus,
  setTouched,
  onChange,
  ...rest
}) => {
  return (
    <ContentWaxEditor
      {...rest}
      onBlur={() => {
        setTouched(set({}, rest.name, true))
      }}
      onChange={val => {
        setTouched(set({}, rest.name, true))
        const cleanedVal = hasValue(val) ? val : ''
        onChange(cleanedVal)
      }}
    />
  )
}

const inputFields = [
  {
    component: inputComponents.TextField,
    label: 'Page title',
    name: 'title',
    type: 'text-input',
  },

  {
    component: inputComponents.TextField,
    label: 'URL',
    name: 'url',
    type: 'text-input',
  },

  {
    component: inputComponents.AbstractEditor,
    label: '',
    name: 'content',
    flexGrow: true,
  },
]

const CMSPageEditForm = ({
  onSubmit,
  setFieldValue,
  setTouched,
  key,
  updatePageStatus,
  submitButtonText,
}) => {
  return (
    <Page>
      <EditorForm key={key} onSubmit={onSubmit}>
        {inputFields.map(item => {
          return (
            <Section flexGrow={item.flexGrow || false} key={item.name}>
              <p style={{ fontSize: '10px' }}>{item.label}</p>
              <ValidatedFieldFormik
                component={item.component}
                name={item.name}
                onChange={value => {
                  if (item.type === 'text-input') {
                    let val = value

                    if (value.target) {
                      val = value.target.value
                    } else if (value.value) {
                      val = value.value
                    }

                    setFieldValue(item.name, val, false)
                    return
                  }

                  setFieldValue(item.name, value)
                }}
                setTouched={setTouched}
                style={{ width: '100%' }}
              />
            </Section>
          )
        })}
        <ActionButtonContainer>
          <FormActionButton primary status={updatePageStatus} type="submit">
            {submitButtonText}
          </FormActionButton>
        </ActionButtonContainer>
      </EditorForm>
    </Page>
  )
}

export default CMSPageEditForm
