import React from 'react'
import {
  ManuscriptsHeaderRow,
  ManuscriptsTableStyled
} from './style'
import FilterSortHeader from './FilterSortHeader'
import ManuscriptRow from './ManuscriptRow'

const ManuscriptsTable = ({ manuscripts, columnsProps, setFilter, setSortName, setSortDirection, sortDirection, sortName }) => {

  return (
    <ManuscriptsTableStyled>
      <ManuscriptsHeaderRow>
        {columnsProps.map(info => (
          <FilterSortHeader
            columnInfo={info}
            key={info.name}
            setFilter={setFilter}
            setSortDirection={setSortDirection}
            setSortName={setSortName}
            sortDirection={sortDirection}
            sortName={sortName}
          />
        ))}
      </ManuscriptsHeaderRow>
      {manuscripts.map((manuscript, key) => {
        const latestVersion =
          manuscript.manuscriptVersions?.[0] || manuscript

        return (
          <ManuscriptRow
            columnDefinitions={columnsProps}
            key={latestVersion.id}
            manuscript={latestVersion}
            setFilter={setFilter}
          />
        )
      })}
    </ManuscriptsTableStyled>
  )
}

export default ManuscriptsTable