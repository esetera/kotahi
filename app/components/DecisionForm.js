import React from 'react'
import PropTypes from 'prop-types'
import FRC from 'formsy-react-components'
import { Button } from 'react-bootstrap'

const DecisionForm = ({ role, onSubmit }) => (
  <FRC.Form onSubmit={onSubmit} validateOnSubmit={true} layout="vertical">
    <div>
      <FRC.Textarea name="decision" label="Decision" rows={5}/>
    </div>

    <div style={{ marginTop: 20 }}>
      <Button type="submit" bsStyle="primary">Submit decision</Button>
    </div>
  </FRC.Form>
)

DecisionForm.propTypes = {
  role: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default DecisionForm
