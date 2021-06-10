import React from 'react'
import DynamicForm from '../../app/components/component-dynamic-form/src'

export const Base = args => <DynamicForm {...args} />

Base.args = {
  formSchema: [
    { name: 'foo', type: 'text', defaultValue: 'Boo!' },
    { name: 'bar', type: 'boolean' },
    { name: 'someNumber', type: 'integer', defaultValue: 3 },
    { name: 'baz', type: 'boolean' },
    { name: 'colour', type: 'color' },
    {
      groupName: 'group',
      fields: [
        { name: 'asdf', type: 'text' },
        { name: 'sdfg', type: 'text' },
      ],
    },
  ],
  values: {
    foo: 'Hello',
    bar: true,
    someNumber: 5,
    baz: true,
    colour: '#aaeeff',
    group: { asdf: 'a', sdfg: 's' },
  },
  // eslint-disable-next-line no-console
  onSubmit: vals => console.log(vals),
}

export default {
  title: 'Dynamic Form/DynamicForm',
  component: DynamicForm,
}
