import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import ReactRouterPropTypes from 'react-router-prop-types'
import Production from './Production'
import { Spinner, CommsErrorBanner } from '../../../shared'

const fragmentFields = `
  id
  created
  status
  files {
    id
    fileType
    mimeType
  }
	submission
  meta {
    title
    source
		abstract
    manuscriptId
  }
`

const query = gql`
  query($id: ID!) {
    currentUser {
      id
      username
      admin
      defaultIdentity {
        name
      }
    }

    manuscript(id: $id) {
      ${fragmentFields}
    }
  }
`

const getPdfQuery = gql`
  query pdfData($html: String) {
    convertToPdf {
      pdfUrl
    }
  }
`

export const updateMutation = gql`
  mutation($id: ID!, $input: String) {
    updateManuscript(id: $id, input: $input) {
      id
      ${fragmentFields}
    }
  }
`

const ProductionPage = ({ match, ...props }) => {
  const [update] = useMutation(updateMutation)

  const updateManuscript = (versionId, manuscriptDelta) => {
    return update({
      variables: {
        id: versionId,
        input: JSON.stringify(manuscriptDelta),
      },
    })
  }

  const makePdf = async () => {
    console.log('in makePDF')

    const { data, loading, error } = useQuery(getPdfQuery, {
      variables: {
        article: manuscript,
      },
    })

    if (loading) return 'loading'
    if (error) return 'error'
    console.log(data)
    // TODO: This needs to download the file!
    return data
  }

  const { data, loading, error } = useQuery(query, {
    variables: {
      id: match.params.version,
    },
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />
  const { manuscript, currentUser } = data

  return (
    <Production
      currentUser={currentUser}
      file={manuscript.files.find(file => file.fileType === 'manuscript') || {}}
      makePdf={makePdf}
      manuscript={manuscript}
      updateManuscript={updateManuscript}
    />
  )
}

ProductionPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default ProductionPage
