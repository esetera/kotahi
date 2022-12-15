import { useMutation, useQuery } from '@apollo/client'
import config from 'config'
import React, { useEffect } from 'react'
import mutations from '../graphql/mutations'
import queries from '../graphql/queries'
import EditorTable from './sections/EditorTable'

const DashboardEditsPage = () => {
  const urlFrag = config.journal.metadata.toplevel_urlfragment
  const wantedRoles = ['seniorEditor', 'handlingEditor', 'editor']

  const query = useQuery(queries.dashboard, {
    variables: {
      wantedRoles,
      sort: null,
      offset: 0,
      limit: process.env.INSTANCE_NAME === 'ncrc' ? 100 : 10,
      filters: [],
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    },
    fetchPolicy: 'cache-and-network',
  })

  const [updateTab] = useMutation(mutations.updateTab)

  useEffect(() => {
    updateTab({
      variables: {
        tab: 'edits',
      },
    })
  }, [])

  return <EditorTable query={query} urlFrag={urlFrag} />
}

export default DashboardEditsPage
