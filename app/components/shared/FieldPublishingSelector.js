import React from 'react'

const FieldPublishingSelector = ({ name, onChange }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      Publish{' '}
      <input
        onChange={event => onChange(name, event.target.checked)}
        type="checkbox"
      />
    </label>
  )
}

export default FieldPublishingSelector
