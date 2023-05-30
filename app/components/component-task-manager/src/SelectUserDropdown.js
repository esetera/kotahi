import React from 'react'
import styled from 'styled-components'

const SelectUserDropdown = props => {
  const { lastIndexOfAtSymbol, users } = props

  const DropdownContainer = styled.div`
    display: inline-block;
    left: ${(lastIndexOfAtSymbol % 38) * 6.5}px;
    position: relative;
  `

  const DropdownList = styled.div`
    background-color: #fff;
    border: 1px solid #ccc;
    left: 0;
    margin-bottom: -24px;
    margin-left: 43px;
    max-height: 200px;
    overflow-y: auto;
    right: 0;
    top: 100%;
    width: 200px;
    z-index: 1;
  `

  const DropdownListItem = styled.div`
    color: #000;
    cursor: pointer;
    padding: 5px;
    white-space: nowrap;

    &:hover {
      background-color: #f2f2f2;
      color: #000;
    }
  `

  const handleItemClick = item => {
    props.setUserSelectionItem(item.username)
  }

  if (users.length === 0) {
    return null // if there are no filteredUsers, return null
  }

  return (
    <DropdownContainer>
      <DropdownList>
        {users.map(item => {
          return (
            <DropdownListItem
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              {item.username}
            </DropdownListItem>
          )
        })}
      </DropdownList>
    </DropdownContainer>
  )
}

export default SelectUserDropdown
