import React from 'react'
import Tooltip from 'rc-tooltip'
import { StyledAlertCircle } from '../style'

const OverdueTooltip = ({ manuscript }) => {
  return (
    <div>
      {manuscript.hasOverdueTasksForUser && (
        <Tooltip
          overlay={<p color="red">Overdue Task</p>}
          overlayInnerStyle={{
            backgroundColor: 'LightGray',
            borderColor: 'LightGray',
            fontWeight: 'bold',
            color: 'red',
          }}
          placement="top"
        >
          <StyledAlertCircle />
        </Tooltip>
      )}
    </div>
  )
}

export default OverdueTooltip
