/* eslint-disable no-shadow */
import React from 'react'
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client'
import ReactRouterPropTypes from 'react-router-prop-types'
import { adopt } from 'react-adopt'
import Production from './Production'
import { Spinner, CommsErrorBanner } from '../../../shared'
import { getSpecificFilesQuery } from '../../../asset-manager/src/queries'
import withModal from '../../../asset-manager/src/ui/Modal/withModal'
import DownloadPdfComponent from './DownloadPdf'
import DownloadJatsComponent from './DownloadJats'

const mapper = {
  getSpecificFilesQuery,
  withModal,
}

const mapProps = args => ({
  onAssetManager: manuscriptId =>
    new Promise((resolve, reject) => {
      const {
        withModal: { showModal, hideModal },
      } = args

      const handleImport = async selectedFileIds => {
        const {
          getSpecificFilesQuery: { client, query },
        } = args

        const { data } = await client.query({
          query,
          variables: { ids: selectedFileIds },
        })

        const { getSpecificFiles: files } = data

        const alteredFiles = files.map(file => {
          const mediumSizeFile = file.storedObjects.find(
            storedObject => storedObject.type === 'medium',
          )

          return {
            source: mediumSizeFile.url,
            mimetype: mediumSizeFile.mimetype,
            ...file,
          }
        })

        hideModal()
        resolve(alteredFiles)
      }

      showModal('assetManagerEditor', {
        manuscriptId,
        withImport: true,
        handleImport,
      })
    }),
})

const Composed = adopt(mapper, mapProps)

const fragmentFields = `
  id
  created
  status
	isAuthorProofingEnabled
	teams {
		role
		members {
			user {
				id
				created
			}
		}
	}
  files {
    id
    tags
    storedObjects {
      mimetype
    }
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
    manuscript(id: $id) {
      ${fragmentFields}
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

const showAuthorProofingMode = (manuscript, currentUser) => {
  const authorTeam = manuscript.teams.find(team => team.role === 'author')

  const sortedAuthors = authorTeam?.members
    .slice()
    .sort(
      (a, b) =>
        Date.parse(new Date(b.created)) - Date.parse(new Date(a.created)),
    )

  return (
    manuscript.isAuthorProofingEnabled &&
    sortedAuthors[0]?.user?.id === currentUser.id
  )
}

const ProductionPage = ({ currentUser, match, ...props }) => {
  const client = useApolloClient()
  const [makingPdf, setMakingPdf] = React.useState(false)
  const [makingJats, setMakingJats] = React.useState(false)
  // const [saving, setSaving] = React.useState(false)
  // const [downloading, setDownloading] = React.useState(false)

  // const [currentJats, setCurrentJats] = React.useState({
  //   xml: '',
  //   error: false,
  // })

  const [update] = useMutation(updateMutation)

  const updateManuscript = async (versionId, manuscriptDelta) => {
    const newQuery = await update({
      variables: {
        id: versionId,
        input: JSON.stringify(manuscriptDelta),
      },
    })

    return newQuery
  }

  const { data, loading, error } = useQuery(query, {
    variables: {
      id: match.params.version,
    },
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { manuscript } = data

  const isAuthorProofingMode = showAuthorProofingMode(manuscript, currentUser) // If true, we are in author proofing mode

  const isReadOnlyMode =
    manuscript.isAuthorProofingEnabled && !isAuthorProofingMode // If author proofing is enabled, but we are not the author, we go read-only

  // console.log('Author proofing mode: ', isAuthorProofingMode)
  // console.log('Read only mode: ', isReadOnlyMode)

  return (
    <Composed
      client={client}
      currentUser={currentUser}
      manuscript={manuscript}
      setMakingJats={setMakingJats}
      setMakingPdf={setMakingPdf}
      updateManuscript={updateManuscript}
    >
      {({ onAssetManager }) => (
        <div>
          {makingPdf ? (
            <DownloadPdfComponent
              manuscript={manuscript}
              resetMakingPdf={() => {
                // refetch({ id: match.params.version, manuscriptId: manuscript.id })
                // console.log('resetMakingPdf fired!')
                setMakingPdf(false)
              }}
            />
          ) : null}
          {makingJats ? (
            <DownloadJatsComponent
              manuscript={manuscript}
              resetMakingJats={() => {
                setTimeout(() => {
                  setMakingJats(false)
                }, 1000)
              }}
            />
          ) : null}
          <Production
            client={client}
            currentUser={currentUser}
            file={manuscript.files.find(file =>
              file.tags.includes('manuscript'),
            )}
            isAuthorProofingVersion={isAuthorProofingMode}
            isReadOnlyVersion={isReadOnlyMode}
            makeJats={setMakingJats}
            makePdf={setMakingPdf}
            manuscript={manuscript}
            onAssetManager={onAssetManager}
            updateManuscript={(a, b) => {
              // TODO: This might need to be different based on value of isAuthorProofingMode?
              // eslint-disable-next-line
              // console.log('in update manuscript!')
              updateManuscript(a, b)
            }}
          />
        </div>
      )}
    </Composed>
  )
}

ProductionPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default ProductionPage
