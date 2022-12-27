import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { Button, Checkbox } from '@pubsweet/ui'
import { required } from 'xpub-validators'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'
import { Select } from '../../../../shared'
import { TextField } from '@pubsweet/ui/dist/atoms'
import { SectionRowGrid } from '../../../../shared'

const OptionRenderer = option => (
  <div>
    <div>{option.username}</div>
    <div>{option.email}</div>
  </div>
)

const RowGridStyled = styled(SectionRowGrid)`
  grid-template-columns: repeat(4, minmax(0, 1fr));
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

const NewReviewerEmailInput = ({
  field,
  form: { setFieldValue },
  ...props
}) => (
  <InputField
    {...field}
    onChange={e => setFieldValue('email', e.target.value)}
    placeholder="Email"
    {...props}
  />
)

const NewReviewerNameInput = ({ field, form: { setFieldValue }, ...props }) => (
  <InputField
    {...field}
    placeholder="Name"
    onChange={e => setFieldValue('name', e.target.value)}
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
      <RowGridStyled>
        <Checkbox
          defaultChecked={false}
          checked={isNewUser}
          label="New User"
          onChange={() => setIsNewUser(!isNewUser)}
          width={grid(0.75)}
        />
        {isNewUser ? (
          <>
            <Field name="email" id="email" component={NewReviewerEmailInput} />
            <Field name="name" id="name" component={NewReviewerNameInput} />
            <Button disabled={!isValid} primary type="submit">
              Invite and Notify
            </Button>
          </>
        ) : (
          <>
            <Field
              component={ReviewerInput}
              name="user"
              reviewerUsers={reviewerUsers}
              validate={required}
            />
            <Button disabled={!isValid} primary type="submit">
              Invite reviewer
            </Button>
          </>
        )}
      </RowGridStyled>
    </form>
  </>
)

ReviewerForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reviewerUsers: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
}

export default ReviewerForm
