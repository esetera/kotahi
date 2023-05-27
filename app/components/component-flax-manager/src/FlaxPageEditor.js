import React from 'react'
import { set } from 'lodash'

import { Formik } from 'formik'
import { ValidatedFieldFormik, Button } from '@pubsweet/ui'

import FormWaxEditor from '../../component-formbuilder/src/components/FormWaxEditor'

import { Section, Legend, Heading, Container, Content, Page } from './style'

import { TextInput } from '../../shared'

import { hasValue } from '../../../shared/htmlUtils'

import styled from 'styled-components'

const SubmitButton = styled(Button)`
  margin: 16px;
`

const inputComponents = {
  TextField: TextInput,
}

inputComponents.AbstractEditor = ({
  validationStatus,
  setTouched,
  onChange,
  ...rest
}) => {
  return (
    <FormWaxEditor
      validationStatus={validationStatus}
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
    component: inputComponents.AbstractEditor,
    label: 'Header',
    name: 'header',
  },
  {
    component: inputComponents.AbstractEditor,
    label: 'Body',
    name: 'body',
  },
  {
    component: inputComponents.AbstractEditor,
    label: 'Footer',
    name: 'footer',
  },
]

const FormView = ({ onSubmit, setFieldValue, setTouched, key }) => {
  return (
    <Page>
      <form key={key} onSubmit={onSubmit}>
        {inputFields.map(item => {
          return (
            <Section key={item.name}>
              <Legend space>{item.label}</Legend>
              <ValidatedFieldFormik
                component={item.component}
                name={item.name}
                setTouched={setTouched}
                onChange={value => {
                  setFieldValue(item.name, value)
                }}
              />
            </Section>
          )
        })}
        <SubmitButton primary type="submit">
          Save Page
        </SubmitButton>
      </form>
    </Page>
  )
}

const FlaxPageEditor = () => {
  return (
    <Container>
      <Heading>Flax Pages Editor</Heading>
      <Content>
        <Formik
          initialValues={{
            header: '',
            footer: '',
            body: '',
          }}
          // onSubmit={(values, actions) => {
          //   console.log({ values, actions })
          // }}
        >
          {formikProps => {
            return (
              <FormView
                onSubmit={formikProps.handleSubmit}
                setFieldValue={formikProps.setFieldValue}
                formErrors={formikProps.errors}
                setTouched={formikProps.setTouched}
              />
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
}

export default FlaxPageEditor
