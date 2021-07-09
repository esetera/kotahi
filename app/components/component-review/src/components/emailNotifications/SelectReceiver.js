import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { Typeahead } from 'react-typeahead'

const query = gql`
  {
    users {
      id
      username
      email
      admin
      defaultIdentity {
        id
        name
      }
    }
  }
`

const editorOption = user => ({
  label: user.defaultIdentity?.name || user.email || user.username,
  value: user.email || 'example@mail.ru',
})

const SelectReceiver = ({ changeState, selectedReceiver }) => {
  const { data, loading, error } = useQuery(query)

  if (loading || error) {
    return null
  }

  const options = (data.users || []).map(user => editorOption(user))

  return (
    <Typeahead
      customClasses={{
        input: 'class-input',
      }}
      maxVisible={2}
      onChange={e =>
        changeState({
          ...selectedReceiver,
          email: e.target.value,
        })
      }
      onOptionSelected={selected =>
        changeState({
          ...selectedReceiver,
          email: options.filter(option => selected === option.label)[0].value,
        })
      }
      options={options.map(option => option.label)}
    />
  )
}

// SelectReceiver.propTypes = {
//   setSelectedReceiver: PropTypes.func.isRequired,
// }

export default SelectReceiver
