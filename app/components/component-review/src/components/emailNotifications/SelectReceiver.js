import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { StyledTypeahead } from '../style'

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
    <StyledTypeahead
      maxVisible={2}
      onKeyUp={e => {
        changeState({
          ...selectedReceiver,
          email: e.target.value,
        })
      }}
      onOptionSelected={selected => {
        changeState({
          ...selectedReceiver,
          email: options.filter(option => selected === option.label)[0].value,
        })
      }}
      options={options.map(option => option.label)}
      placeholder="Choose a receiver"
    />
  )
}

// SelectReceiver.propTypes = {
//   setSelectedReceiver: PropTypes.func.isRequired,
// }

export default SelectReceiver
