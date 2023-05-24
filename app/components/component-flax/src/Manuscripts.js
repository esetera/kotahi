/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'
import 'react-toastify/dist/ReactToastify.css'
import { validateManuscriptSubmission } from '../../../shared/manuscriptUtils'
import {
  URI_PAGENUM_PARAM,
  URI_SEARCH_PARAM,
} from '../../../shared/urlParamUtils'

import FlaxPageTable from '../../component-flax-table/src/FlaxPageTable'
import buildColumnDefinitions from '../../component-manuscripts-table/src/util/buildColumnDefinitions'
import {
  ActionButton,
  Columns,
  CommsErrorBanner,
  Container,
  Heading,
  Pagination,
  PaginationContainerShadowed,
  ScrollableContent,
  Spinner,
} from '../../shared'
import SearchControl from './SearchControl'
import { ControlsContainer } from './style'
import { ConfigContext } from '../../config/src'

const OuterContainer = styled(Container)`
  overflow: hidden;
  padding: 0;
`

const ManuscriptsPane = styled.div`
  overflow-y: scroll;
  padding: 16px 16px 0 16px;
`

const FlexRow = styled.div`
  display: flex;
  gap: ${grid(1)};
  justify-content: space-between;
`

const Manuscripts = ({ history, ...props }) => {
  const {
    applyQueryParams,
    validateDoi,
    validateSuffix,
    setReadyToEvaluateLabels,
    deleteManuscriptMutations,
    publishManuscript,
    queryObject,
    sortDirection,
    sortName,
    page,
    urlFrag,
    configuredColumnNames,
    archiveManuscriptMutations,
    uriQueryParams,
  } = props

  const config = useContext(ConfigContext)

  const [selectedNewManuscripts, setSelectedNewManuscripts] = useState([])

  const toggleNewManuscriptCheck = id => {
    setSelectedNewManuscripts(s => {
      return selectedNewManuscripts.includes(id)
        ? s.filter(manuscriptId => manuscriptId !== id)
        : [...s, id]
    })
  }

  const limit = config?.manuscript?.paginationCount

  const { loading, error, data } = queryObject

  const deleteManuscript = id => deleteManuscriptMutations(id)

  const archiveManuscript = id => archiveManuscriptMutations(id)

  const tryPublishManuscript = async manuscript => {
    let result = null

    const hasInvalidFields = await validateManuscriptSubmission(
      manuscript.submission,
      data.formForPurposeAndCategory?.structure,
      validateDoi,
      validateSuffix,
    )

    if (hasInvalidFields.filter(Boolean).length) {
      result = [
        {
          stepLabel: 'publishing',
          errorMessage:
            'This manuscript has incomplete or invalid fields. Please correct these and try again.',
        },
      ]
    } else {
      result = (await publishManuscript(manuscript.id)).data.publishManuscript
    }

    return result
  }

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const manuscripts = data.paginatedManuscripts.manuscripts.map(m => {
    return {
      ...m,
      submission: JSON.parse(m.submission),
      manuscriptVersions: m.manuscriptVersions?.map(v => ({
        ...v,
        submission: JSON.parse(v.submission),
      })),
    }
  })

  const fieldDefinitions = {}
  const fields = data.formForPurposeAndCategory?.structure?.children ?? []
  fields.forEach(field => {
    if (field.name) fieldDefinitions[field.name] = field // Incomplete fields in the formbuilder may not have a name specified. Ignore these
  })

  const { totalCount } = data.paginatedManuscripts

  const setReadyToEvaluateLabel = id => {
    if (selectedNewManuscripts.includes(id)) {
      toggleNewManuscriptCheck(id)
    }

    return setReadyToEvaluateLabels(id)
  }

  const currentSearchQuery = uriQueryParams.get(URI_SEARCH_PARAM)

  // Props for instantiating special components
  const specialComponentValues = {
    deleteManuscript,
    archiveManuscript,
    tryPublishManuscript,
    selectedNewManuscripts,
    toggleNewManuscriptCheck,
    setReadyToEvaluateLabel,
    urlFrag,
  }

  // Props for filtering / sorting
  const displayProps = {
    uriQueryParams,
    columnToSortOn: sortName,
    sortDirection,
    currentSearchQuery,
  }

  const adjustedColumnNames = [...configuredColumnNames]
  adjustedColumnNames.push('actions')
  if (['ncrc', 'colab'].includes(config.instanceName))
    adjustedColumnNames.splice(0, 0, 'newItemCheckbox')

  // Source of truth for columns
  const columnsProps = buildColumnDefinitions(
    config,
    adjustedColumnNames,
    fieldDefinitions,
    specialComponentValues,
    displayProps,
  )

  const topRightControls = (
    <ControlsContainer>
      {config?.manuscript?.newSubmission && (
        <ActionButton
          onClick={() => history.push(`${urlFrag}/newSubmission`)}
          primary
        >
          ＋ New Flax Page
        </ActionButton>
      )}

      <SearchControl
        applySearchQuery={newQuery =>
          applyQueryParams({
            [URI_SEARCH_PARAM]: newQuery,
            [URI_PAGENUM_PARAM]: 1,
          })
        }
        currentSearchQuery={currentSearchQuery}
      />
    </ControlsContainer>
  )

  return (
    <OuterContainer>
      <Columns>
        <ManuscriptsPane>
          <FlexRow>
            <Heading>Flax Pages</Heading>
            {topRightControls}
          </FlexRow>
          <div>
            <ScrollableContent>
              <FlaxPageTable
                applyQueryParams={applyQueryParams}
                columnsProps={columnsProps}
                manuscripts={manuscripts}
                sortDirection={sortDirection}
                sortName={sortName}
              />
            </ScrollableContent>
            <Pagination
              limit={limit}
              page={page}
              PaginationContainer={PaginationContainerShadowed}
              setPage={newPage =>
                applyQueryParams({ [URI_PAGENUM_PARAM]: newPage })
              }
              totalCount={totalCount}
            />
          </div>
        </ManuscriptsPane>
      </Columns>
    </OuterContainer>
  )
}

export default Manuscripts
