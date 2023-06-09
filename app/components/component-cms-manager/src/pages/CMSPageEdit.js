import React from 'react'

import { Formik } from 'formik'

import { Heading } from '../style'

import CMSPageEditForm from './CMSPageEditForm'

const CMSPageEdit = ({
  cmsPage,
  updatePageDataQuery,
  rebuildFlaxSiteQuery,
}) => {
  const [submitButtonState, setSubmitButtonState] = React.useState({
    state: null,
    text: 'Publish',
  })

  const updatePageData = async (formData, currentCmsPage) => {
    let currentMeta = JSON.parse(currentCmsPage.meta)

    const inputData = {
      title: formData.title,
      content: formData.content,
      meta: JSON.stringify({ ...currentMeta, url: formData.url }),
    }

    updatePageDataQuery({
      variables: {
        id: currentCmsPage.id,
        input: inputData,
      },
    })
  }

  const rebuildingTheSite = () => rebuildFlaxSiteQuery()

  const meta = JSON.parse(cmsPage.meta)

  return (
    <>
      <Heading>Pages</Heading>
      <>
        <Formik
          initialValues={{
            title: cmsPage.title,
            content: cmsPage.content,
            url: meta.url || '',
          }}
          onSubmit={async (values, actions) => {
            setSubmitButtonState({ state: 'pending', text: 'Saving data' })
            await updatePageData(values, cmsPage)
            setSubmitButtonState({ state: 'pending', text: 'Rebuilding...' })
            await rebuildingTheSite()
            setSubmitButtonState({ state: 'success', text: 'Save Page' })
          }}
        >
          {formikProps => {
            return (
              <CMSPageEditForm
                cmsPage={cmsPage}
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
      </>
    </>
  )
}

export default CMSPageEdit
