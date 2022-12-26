import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { Button, Checkbox } from '@pubsweet/ui'
import { required } from 'xpub-validators'
import styled from 'styled-components'
// import 'react-select1/dist/react-select.css'
import { grid } from '@pubsweet/ui-toolkit'
import { Select } from '../../../../shared'
import { TextField } from '@pubsweet/ui/dist/atoms'

const OptionRenderer = option => (
  <div>
    <div>{option.username}</div>
    <div>{option.email}</div>
  </div>
)

const FieldAndButton = styled.div`
  display: grid;
  grid-gap: ${grid(2)};
  grid-template-columns: ${grid(30)} ${grid(10)};
`

const FieldsAndButton = styled.div`
  display: grid;
  grid-gap: ${grid(3)};
  grid-template-columns: ${grid(30)} ${grid(30)} ${grid(10)};
`

const InputField = styled(TextField)`
  height: 40px;
  margin-bottom: 0;
`

const ReviewerInput = ({ field, form: { setFieldValue }, reviewerUsers }) => (
  <Select
    {...field}
    aria-label="Invite reviewers"
    getOptionLabel={option => option?.username}
    getOptionValue={option => option.id}
    onChange={user => {
      setFieldValue('user', user)
    }}
    optionRenderer={OptionRenderer}
    options={reviewerUsers}
    promptTextCreator={label => `Add ${label}?`}
    valueKey="id"
  />
)

const NewReviewerEmailInput = ({field, form: { setFieldValue }, ...props}) => (
  <InputField
    {...field}
    onChange={(e) => setFieldValue('email', e.target.value)}
    placeholder="Email"
    {...props}
  />
)

const NewReviewerNameInput = ({
  field,
  form: { setFieldValue },
  ...props
}) => (
  <InputField
    {...field}
    placeholder="Name"
    onChange={(e) => setFieldValue('name', e.target.value)}
    {...props}
  />
)

ReviewerInput.propTypes = {
  field: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  reviewerUsers: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
}

const ReviewerForm = ({
  isValid,
  handleSubmit,
  reviewerUsers,
  isNewUser,
  setIsNewUser,
}) => (
  <>
    <form onSubmit={handleSubmit}>
      <Checkbox
        defaultChecked={false}
        checked={isNewUser}
        label="New User"
        onChange={() => setIsNewUser(!isNewUser)}
      />
      {isNewUser ? (
        <FieldsAndButton>
          <Field name="email" id="email" component={NewReviewerEmailInput} />
          <Field name="name" id="name" component={NewReviewerNameInput} />
          <Button disabled={!isValid} primary type="submit">
            Invite reviewer
          </Button>
        </FieldsAndButton>
      ) : (
        <FieldAndButton>
          <Field
            component={ReviewerInput}
            name="user"
            reviewerUsers={reviewerUsers}
            validate={required}
          />
          <Button disabled={!isValid} primary type="submit">
            Invite reviewer
          </Button>
        </FieldAndButton>
      )}
    </form>
  </>
)

ReviewerForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reviewerUsers: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
}

export default ReviewerForm
