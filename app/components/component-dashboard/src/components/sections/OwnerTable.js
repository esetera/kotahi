import { useQuery } from '@apollo/client'
import React from 'react'
import { CommsErrorBanner, Spinner } from '../../../../shared'
import queries from '../../graphql/queries'
import { Placeholder } from '../../style'
import { getLatestVersion, getManuscriptsUserHasRoleIn } from '../../utils'
import OwnerItem from './OwnerItem'

const OwnerTable = ({ instanceName, shouldShowShortId, urlFrag }) => {
  // const [deleteManuscript] = useMutation(mutations.deleteManuscriptMutation, {
  //   update: (cache, { data: { deleteManuscript } }) => {
  //     const data = cache.readQuery({ query: queries.dashboard })
  //     const manuscripts = data.manuscripts.filter(
  //       manuscript => manuscript.id !== deleteManuscript,
  //     )
  //     cache.writeQuery({
  //       query: queries.dashboard,
  //       data: {
  //         manuscripts,
  //       },
  //     })
  //   },
  // })

  const { loading, data, error } = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const currentUser = data && data.currentUser

  const latestVersions = data.manuscriptsUserHasCurrentRoleIn.map(
    getLatestVersion,
  )

  const authorLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['author'],
  )

  if (authorLatestVersions.length === 0) {
    return (<Placeholder>
    You have not submitted any manuscripts yet
  </Placeholder>)
  }

  return <>{
    authorLatestVersions.map(version => (
      // Links are based on the original/parent manuscript version
      <OwnerItem
        instanceName={instanceName}
        // deleteManuscript={() =>
        //   // eslint-disable-next-line no-alert
        //   window.confirm(
        //     'Are you sure you want to delete this submission?',
        //   ) && deleteManuscript({ variables: { id: submission.id } })
        // }
        key={version.id}
        shouldShowShortId={shouldShowShortId}
        urlFrag={urlFrag}
        version={version}
      />
    ))
  }</>

}

export default OwnerTable