import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ucfirst } from '../lib/text'
import ReviewerInvitationForm from '../components/ReviewerInvitationForm'
import DecisionForm from '../components/DecisionForm'
import ReviewForm from '../components/ReviewForm'
import { selectCollection } from '../lib/selectors'

class RoleContainer extends React.Component {
  render () {
    const { role, roleType } = this.props

    return (
      <div>
        <h1>{ucfirst(roleType)}: {role.user.name || role.user.username}</h1>

        {roleType === 'reviewer' && (
          <div>
            <ReviewerInvitationForm role={role} onSubmit={inviteReviewer}/>
            <ReviewForm role={role} onSubmit={submitReview}/>
          </div>
          )}

        {roleType === 'editor' && (
          <div>
            <DecisionForm role={role} onSubmit={submitDecision}/>
          </div>
        )}
      </div>
    )
  }
}

RoleContainer.propTypes = {
  project: PropTypes.object,
  role: PropTypes.object,
  roleType: PropTypes.string.isRequired
}

export default connect(
  (state, ownProps) => {
    const project = selectCollection(state, ownProps.params.project)

    const { roleType } = ownProps.params

    const role = project.roles[roleType][ownProps.params.role]

    return { project, role, roleType }
  }
)(RoleContainer)
