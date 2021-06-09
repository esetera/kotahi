import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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

const FieldLabel = styled.span`
  margin: 0 0.5em 0 2em;

  div + &,
  :first-child {
    margin-left: 0;
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
  text-align: right;
  width: ${grid(25)};
`

const GroupContainer = styled.div`
  border: 1px solid ${th('colorBorder')};
  margin-top: ${grid(2)};
  padding: ${grid(1)};
  width: 100%;

  :first-child {
    margin-top: 0;
  }
`

const Heading = styled.div`
  color: ${th('colorPrimary')};
  font-size: 85%;
  text-transform: uppercase;
`

const TextField = ({ name, defaultValue, constraints }) => {
  return <Input type="text" value={defaultValue ?? ''} />
}

const IntegerField = ({ name, defaultValue, constraints }) => {
  return <Input type="number" value={defaultValue ?? 0} />
}

const BooleanField = ({ name, defaultValue, constraints }) => {
  return <Input type="checkbox" value={defaultValue ?? false} />
}

const Field = ({ name, type, defaultValue, constraints }) => {
  return (
    <Row>
      <TitleCell>
        <FieldLabel>{name}</FieldLabel>
      </TitleCell>
      {type === 'text' && (
        <TextField
          constraints={constraints}
          defaultValue={defaultValue}
          name={name}
        />
      )}
      {type === 'integer' && (
        <IntegerField
          constraints={constraints}
          defaultValue={defaultValue}
          name={name}
        />
      )}
      {type === 'boolean' && (
        <BooleanField
          constraints={constraints}
          defaultValue={defaultValue}
          name={name}
        />
      )}
    </Row>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  constraints: constraintsPropType,
}

Field.defaultProps = {
  constraints: undefined,
  defaultValue: undefined,
}

const Group = ({ groupName, fields }) => {
  return (
    <GroupContainer name={groupName}>
      {groupName && <Heading>{groupName}</Heading>}
      {fields.map(fieldOrGroup => {
        if (fieldOrGroup.groupName)
          return <Group {...fieldOrGroup} key={fieldOrGroup.groupName} />
        return <Field {...fieldOrGroup} key={fieldOrGroup.name} />
      })}
    </GroupContainer>
  )
}

Group.propTypes = {
  groupName: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.oneOf([
      PropTypes.shape(Field.propTypes).isRequired,
      PropTypes.shape({
        groupName: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired, // nested fields/groups
      }).isRequired,
    ]).isRequired,
  ).isRequired,
}
export default Group
