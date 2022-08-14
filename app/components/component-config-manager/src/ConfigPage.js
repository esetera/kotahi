import React from 'react'
import Form from 'react-jsonschema-form'

const schema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
}

const ConfigPage = () => {
  return (
    <Form
      // onChange={console.log('changed')}
      // onError={console.log('errors')}
      // onSubmit={console.log('submitted')}
      schema={schema}
    />
  )
}

export default ConfigPage
