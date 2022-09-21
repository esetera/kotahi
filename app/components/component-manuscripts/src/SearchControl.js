import React, { useState, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import { X } from 'react-feather'
import { th, grid } from '@pubsweet/ui-toolkit'
import { RoundIconButton } from '../../shared'
import lightenBy from '../../../shared/lightenBy'

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 0 1 ${props => (props.isOpen ? '40em' : '')};
  gap: ${grid(1)};
  justify-content: flex-end;
`

const InlineTextField = styled.input`
  background-color: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.isFilteringResults
      ? props.isShowingCurrentSearch
        ? lightenBy('colorPrimary', 0.4) // Stronger color to indicate this is the current search filtering
        : lightenBy('colorPrimary', 0.8) // Weaker, to indicate there is filtering but the string is no longer representative of it
      : 'colorBackground'};
  border: 1px solid ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  display: inline;
  flex: 0 1 40em;
  height: ${grid(4)};
  padding: 0 8px;
  transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};

  &:focus {
    border-color: ${th('colorPrimary')};
    box-shadow: ${th('boxShadow')};
  }
`

const SearchControl = ({ currentSearchQuery, applySearchQuery }) => {
  const [searchText, setSearchText] = useState(currentSearchQuery || '')
  const [isOpen, setIsOpen] = useState(!!currentSearchQuery)
  const ref = useRef(null)
  const theme = useTheme()

  const submitSearch = query => {
    if ((query || null) !== currentSearchQuery) applySearchQuery(query)
    setSearchText(query || '')
  }

  return (
    <SearchContainer isOpen={isOpen}>
      {isOpen && (
        <>
          <InlineTextField
            autoComplete="off"
            autoFocus
            id="enter-search"
            isFilteringResults={!!currentSearchQuery}
            isShowingCurrentSearch={searchText === currentSearchQuery}
            onBlur={e => {
              if (!searchText) setTimeout(() => setIsOpen(false), 400) // Delay so if you click the search button the input doesn't close and then reopen
            }}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') submitSearch(searchText)
              else if (e.key === 'Escape') {
                setSearchText(currentSearchQuery)
                if (!currentSearchQuery) setIsOpen(false)
              }
            }}
            placeholder="Enter search terms..."
            ref={ref}
            title='Surround multi-word phrases with quotes "". Exclude a term by prefixing with -. Specify alternate matches using OR. Use * as wildcard for word endings. Wrap subexpressions in parentheses ().'
            type="text"
            value={searchText}
          />
          <button type="button">
            <X
              color={searchText ? theme.colorText : theme.colorBorder}
              onClick={() => {
                submitSearch('')
                ref.current.focus()
              }}
              size={16}
              strokeWidth={3.5}
            />
          </button>
        </>
      )}
      <RoundIconButton
        iconName="Search"
        onClick={() => {
          submitSearch(searchText)
          if (isOpen) ref.current.focus()
          else setIsOpen(true)
        }}
        primary={isOpen}
        title="Search"
      />
    </SearchContainer>
  )
}

export default SearchControl