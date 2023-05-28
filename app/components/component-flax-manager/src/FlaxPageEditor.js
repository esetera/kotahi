import React from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { Formik } from 'formik'

import { Heading, Container, Content } from './style'

import { Spinner, CommsErrorBanner } from '../../shared'

import { getFlaxPage, updatePageDataMutation } from './queries'

import FormView from './FormView'

const FlaxPageEditor = ({ match }) => {
  const { loading, data, error, refetch: refetchPageData } = useQuery(
    getFlaxPage,
    {
      variables: {
        id: match.params.pageId,
      },
    },
  )

  const [updatePageDataQuery] = useMutation(updatePageDataMutation)

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
        id: match.params.pageId,
        input: inputData,
      },
    })
  }

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { flaxPage } = data
  const { content } = flaxPage

  return (
    <Container>
      <Heading>{flaxPage.title}</Heading>
      <Content>
        <Formik
          initialValues={{
            title: flaxPage.title,
            header: content.header,
            footer: content.footer,
            body: content.body,
          }}
          onSubmit={async (values, actions) => {
            await updatePageData(values)
            refetchPageData()
          }}
        >
          {formikProps => {
            return (
              <FormView
                formErrors={formikProps.errors}
                onSubmit={formikProps.handleSubmit}
                setFieldValue={formikProps.setFieldValue}
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
