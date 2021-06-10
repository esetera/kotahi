import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { th, grid } from '@pubsweet/ui-toolkit'

const constraintPropType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOf([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
}).isRequired

const constraintsPropType = PropTypes.oneOf([
  constraintPropType,
  PropTypes.arrayOf(constraintPropType),
])

const valuePropType = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
  PropTypes.bool.isRequired,
]).isRequired

const valuesPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.bool.isRequired,
    PropTypes.shape({
      /* group with nested fields */
    }).isRequired,
  ]).isRequired,
).isRequired

const FieldLabel = styled.label`
  margin: 0 0.5em 0 2em;

  div + &,
  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`

const Input = styled.input`
  border: 1px solid ${th('colorFurniture')};
`

const Row = styled.div`
  align-items: center;
  display: flex;
  min-height: 3.5ex;
  width: 100%;
`

const TitleCell = styled.div`
  line-height: 2.3ex;
  padding-right: 0.5em;
  text-align: right;
  width: ${grid(25)};
`

const GroupContainer = styled.div`
  margin-top: ${grid(2)};
  padding: ${grid(1)};
  width: 100%;

  :first-child {
    margin-top: 0;
  }

  & > & {
    border: 1px solid ${th('colorBorder')};
  }
`

const Heading = styled.div`
  color: ${th('colorPrimary')};
  font-size: 85%;
  text-transform: uppercase;
`

const TextField = ({ name, value, constraints, onChange }) => {
  return (
    <Input name={name} onChange={onChange} type="text" value={value ?? ''} />
  )
}

const IntegerField = ({ name, value, constraints, onChange }) => {
  return (
    <Input name={name} onChange={onChange} type="number" value={value ?? 0} />
  )
}

const BooleanField = ({ name, value, constraints, onChange }) => {
  return (
    <Input
      name={name}
      onChange={onChange}
      type="checkbox"
      value={value ?? false}
    />
  )
}

const ColorField = ({ name, value, constraints, onChange }) => {
  return (
    <Input
      name={name}
      onChange={onChange}
      type="color"
      value={value ?? '#000'}
    />
  )
}

const fieldComponents = {
  text: TextField,
  integer: IntegerField,
  boolean: BooleanField,
  color: ColorField,
}

const Field = ({ groupPath, name, type, constraints, value, onChange }) => {
  const fieldPath = `${groupPath}${name}`
  const Component = fieldComponents[type]

  return (
    <Row>
      <TitleCell>
        <FieldLabel htmlFor={fieldPath}>{name}</FieldLabel>
      </TitleCell>
      {Component && (
        <Component
          constraints={constraints}
          name={fieldPath}
          onChange={onChange}
          value={value}
        />
      )}
    </Row>
  )
}

Field.propTypes = {
  groupPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: valuePropType,
  constraints: constraintsPropType,
  onChange: PropTypes.func.isRequired,
}

Field.defaultProps = {
  constraints: undefined,
  value: undefined,
}

const Group = ({
  groupName,
  groupPath: outerGroupPath,
  fields,
  values,
  onChange,
}) => {
  const innerGroupPath = groupName ? `${outerGroupPath}${groupName}.` : ''

  return (
    <GroupContainer name={groupName}>
      {groupName && <Heading>{groupName}</Heading>}
      {fields.map(fieldOrGroup => {
        if (fieldOrGroup.groupName)
          return (
            <Group
              {...fieldOrGroup}
              groupPath={innerGroupPath}
              key={fieldOrGroup.groupName}
              onChange={onChange}
              values={values[fieldOrGroup.groupName]}
            />
          )
        return (
          <Field
            {...fieldOrGroup}
            groupPath={innerGroupPath}
            key={fieldOrGroup.name}
            onChange={onChange}
            value={values[fieldOrGroup.name]}
          />
        )
      })}
    </GroupContainer>
  )
}

Group.propTypes = {
  groupName: PropTypes.string,
  groupPath: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        constraints: constraintsPropType,
      }).isRequired,
      PropTypes.shape({
        groupName: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired, // nested fields/groups
      }).isRequired,
    ]).isRequired,
  ).isRequired,
  // eslint-disable-next-line react/require-default-props
  values: valuesPropType,
  onChange: PropTypes.func.isRequired,
}

Group.defaultProps = {
  groupName: '',
  groupPath: '',
}

const DynamicForm = ({ formSchema, values, onSubmit }) => {
  const formik = useFormik({
    initialValues: values,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Group
        fields={formSchema}
        groupName=""
        onChange={formik.handleChange}
        values={formik.values}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

DynamicForm.propTypes = {
  formSchema: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        constraints: constraintsPropType,
      }).isRequired,
      PropTypes.shape({
        groupName: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired, // nested fields/groups
      }).isRequired,
    ]).isRequired,
  ).isRequired,
  // eslint-disable-next-line react/require-default-props
  values: valuesPropType,
  onSubmit: PropTypes.func.isRequired,
}

export default DynamicForm
