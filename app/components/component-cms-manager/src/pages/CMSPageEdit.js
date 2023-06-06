import React from 'react'

import { Formik } from 'formik'

import { Heading, Content } from '../style'

import CMSPageEditForm from './CMSPageEditForm'

const CMSPageEdit = ({
  cmsPage,
  updatePageDataQuery,
  rebuildFlaxSiteQuery,
}) => {
  const [submitButtonState, setSubmitButtonState] = React.useState({
    state: null,
    text: 'Save Page',
  })

  const updatePageData = formData => {
    const inputData = {
      title: formData.title,
      content: {
        header: formData.header,
        footer: formData.footer,
        body: formData.body,
      },
    }

    return updatePageDataQuery({
      variables: {
        id: cmsPage.id,
        input: inputData,
      },
    })
  }

  const rebuildingTheSite = () => rebuildFlaxSiteQuery()

  const { content } = cmsPage

  return (
    <div>
      <Heading>Pages</Heading>
      <Content>
        <Formik
          initialValues={{
            title: cmsPage.title,
            body: content,
          }}
          onSubmit={async (values, actions) => {
            setSubmitButtonState({ state: 'pending', text: 'Saving data' })
            await updatePageData(values)
            setSubmitButtonState({ state: 'pending', text: 'Rebuilding...' })
            await rebuildingTheSite()
            setSubmitButtonState({ state: 'success', text: 'Save Page' })
          }}
        >
          {formikProps => {
            return (
              <CMSPageEditForm
                formErrors={formikProps.errors}
                onSubmit={formikProps.handleSubmit}
                setFieldValue={formikProps.setFieldValue}
                setTouched={formikProps.setTouched}
                submitButtonText={submitButtonState.text}
                updatePageStatus={submitButtonState.state}
              />
            )
          }}
        </Formik>
      </Content>
    </div>
  )
}

export default CMSPageEdit
