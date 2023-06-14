import React, { useState } from 'react'

import { Formik } from 'formik'

import { kebabCase } from 'lodash'

import CMSPageEditForm from './CMSPageEditForm'

import { FullWidthANDHeight } from '../style'

const CMSPageEdit = ({
  isNewPage,
  cmsPage,
  updatePageDataQuery,
  rebuildFlaxSiteQuery,
  createNewCMSPage,
  showPage,
}) => {
  const [submitButtonState, setSubmitButtonState] = useState({
    state: null,
    text: 'Publish',
  })

  const saveData = async (id, data) => {
    // let's not auto save the data when we are creating a new page.
    if (isNewPage) {
      return
    }
    const inputData = { ...data, edited: new Date() }
    await updatePageDataQuery({
      variables: { id, input: inputData },
    })
    return
  }

  const publish = async formData => {
    setSubmitButtonState({ state: 'pending', text: 'Saving data' })
    const meta = JSON.parse(cmsPage.meta)
    const timeStamp = new Date()

    const inputData = {
      title: formData.title,
      content: formData.content,
      meta: JSON.stringify({ ...meta, url: formData.url }),
      published: timeStamp,
    }

    await updatePageDataQuery({
      variables: {
        id: cmsPage.id,
        input: inputData,
      },
    })

    setSubmitButtonState({ state: 'pending', text: 'Rebuilding...' })
    await rebuildFlaxSiteQuery()
    setSubmitButtonState({ state: 'success', text: 'Published' })
  }

  const createNewPage = async formData => {
    const inputData = {
      title: formData.title,
      shortcode: kebabCase(formData.title),
      content: formData.content,
      meta: JSON.stringify({ url: formData.url }),
    }

    const newCMSPageResults = await createNewCMSPage({
      variables: {
        input: inputData,
      },
    })

    const newCmsPage = newCMSPageResults.data.createCMSPage
    showPage(newCmsPage)
  }

  let meta = {}
  if (cmsPage.meta) {
    meta = JSON.parse(cmsPage.meta)
  }

  return (
    <FullWidthANDHeight>
      <FullWidthANDHeight>
        <Formik
          initialValues={{
            title: cmsPage.title || '',
            content: cmsPage.content || '',
            url: meta.url || '',
          }}
          onSubmit={async values =>
            isNewPage ? createNewPage(values) : publish(values)
          }
        >
          {formikProps => {
            return (
              <CMSPageEditForm
                isNewPage={isNewPage}
                cmsPage={cmsPage}
                formErrors={formikProps.errors}
                onSubmit={formikProps.handleSubmit}
                saveData={saveData}
                setFieldValue={formikProps.setFieldValue}
                setTouched={formikProps.setTouched}
                submitButtonText={
                  isNewPage ? 'Add page' : submitButtonState.text
                }
              />
            )
          }}
        </Formik>
      </FullWidthANDHeight>
    </FullWidthANDHeight>
  )
}

export default CMSPageEdit
