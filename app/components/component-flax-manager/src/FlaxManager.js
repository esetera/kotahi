import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

import Flax from './Flax'
import {
  Container,
  Table,
  Header,
  Heading,
  Content,
  Spinner,
  Pagination,
  CaretUp,
  CaretDown,
  Carets,
} from './style'
import { CommsErrorBanner, PaginationContainer } from '../../shared'
import {
  extractSortData,
  URI_PAGENUM_PARAM,
  URI_SORT_PARAM,
  useQueryParams,
} from '../../../shared/urlParamUtils'

const GET_USERS = gql`
  query Users($sort: UsersSort, $offset: Int, $limit: Int) {
    paginatedUsers(sort: $sort, offset: $offset, limit: $limit) {
      totalCount
      users {
        id
        username
        globalRoles
        groupRoles
        email
        profilePicture
        defaultIdentity {
          id
          identifier
        }
        created
        isOnline
        lastOnline
      }
    }
  }
`

const FlaxManager = ({ history, currentUser }) => {
  const SortHeader = ({ thisSortName, defaultSortDirection, children }) => {
    const changeSort = () => {
      let newSortDirection

      if (sortName !== thisSortName) {
        newSortDirection = defaultSortDirection || 'ASC'
      } else if (sortDirection === 'ASC') {
        newSortDirection = 'DESC'
      } else if (sortDirection === 'DESC') {
        newSortDirection = 'ASC'
      }

      applyQueryParams({
        [URI_SORT_PARAM]: `${thisSortName}_${newSortDirection}`,
        [URI_PAGENUM_PARAM]: 1,
      })
    }

    const UpDown = () => {
      if (thisSortName === sortName) {
        return (
          <Carets>
            <CaretUp active={sortDirection === 'ASC'} />
            <CaretDown active={sortDirection === 'DESC'} />
          </Carets>
        )
        // return sortDirection
      }

      return null
    }

    return (
      <th onClick={changeSort}>
        {children} {UpDown()}
      </th>
    )
  }

  const applyQueryParams = useQueryParams()

  const params = new URLSearchParams(history.location.search)
  const page = params.get(URI_PAGENUM_PARAM) || 1
  const sortName = extractSortData(params).name || 'created'
  const sortDirection = extractSortData(params).direction || 'DESC'
  const limit = 10
  const sort = sortName && sortDirection && `${sortName}_${sortDirection}`

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      sort,
      offset: (page - 1) * limit,
      limit,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { users, totalCount } = data.paginatedUsers

  const user = users[0]

  return (
    <Container>
      <Heading>Flax</Heading>
      <Content>
        <Table>
          <Header>
            <tr>
              <SortHeader defaultSortDirection="ASC" thisSortName="username">
                Title
              </SortHeader>
              <SortHeader defaultSortDirection="DESC" thisSortName="created">
                Created
              </SortHeader>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
            </tr>
          </Header>
          <tbody>
            <Flax key={user.id} currentUser={currentUser} user={user} />
          </tbody>
        </Table>

        <Pagination
          limit={limit}
          page={page}
          PaginationContainer={PaginationContainer}
          setPage={newPage =>
            applyQueryParams({ [URI_PAGENUM_PARAM]: newPage })
          }
          totalCount={totalCount}
        />
      </Content>
    </Container>
  )
}

export default FlaxManager
