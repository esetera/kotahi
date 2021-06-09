import React from 'react'
import DynamicForm from '../../app/components/component-dynamic-form/src'

export const Base = args => <DynamicForm {...args} />

Base.args = {
  groupName: 'Example form',
  fields: [
    { name: 'Foo', type: 'text', defaultValue: 'Boo!' },
    { name: 'Bar', type: 'boolean' },
    { name: 'some number', type: 'integer', defaultValue: 3 },
    {
      name: 'This field has a really long field name that spans multiple lines',
      type: 'boolean',
    },
  ],
}

export default {
  title: 'Dynamic Form/DynamicForm',
  component: DynamicForm,
}
