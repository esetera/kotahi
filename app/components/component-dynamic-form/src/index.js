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

const Field = ({ groupPath, name, type, constraints, value, onChange }) => {
  const fieldPath = `${groupPath}${name}`

  return (
    <Row>
      <TitleCell>
        <FieldLabel htmlFor={fieldPath}>{fieldPath}</FieldLabel>
      </TitleCell>
      {type === 'text' && (
        <TextField
          constraints={constraints}
          name={fieldPath}
          onChange={onChange}
          value={value}
        />
      )}
      {type === 'integer' && (
        <IntegerField
          constraints={constraints}
          name={fieldPath}
          onChange={onChange}
          value={value}
        />
      )}
      {type === 'boolean' && (
        <BooleanField
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
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.bool.isRequired,
  ]),
  constraints: constraintsPropType,
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
  const innerGroupPath = `${outerGroupPath}${groupName}.`

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
  groupName: PropTypes.string.isRequired,
  groupPath: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(Field.propTypes).isRequired,
      PropTypes.shape({
        groupName: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired, // nested fields/groups
      }).isRequired,
    ]).isRequired,
  ).isRequired,
}

Group.defaultProps = {
  groupPath: '',
}

const DynamicForm = ({ groupName, fields, values, onSubmit }) => {
  const formik = useFormik({
    initialValues: values,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Group
        fields={fields}
        groupName={groupName}
        onChange={formik.handleChange}
        values={formik.values[groupName]}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

DynamicForm.propTypes = {}

export default DynamicForm
