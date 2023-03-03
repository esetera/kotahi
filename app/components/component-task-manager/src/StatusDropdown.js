import React from 'react'
import styled from 'styled-components'
import Dropdown from 'react-dropdown'
import { useMutation } from '@apollo/client'
import {
  Pause as PauseIcon,
  Check as CheckIcon,
  ChevronUp,
  ChevronDown,
} from 'react-feather'
import { UPDATE_TASK_STATUS } from '../../../queries'
import theme from '../../../theme'

const StartButton = styled.button`
  background: ${theme.colors.brand1.base};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  width: 111px;
  height: 45px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizeBase};
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.01em;
  color: white;
`

const BaseDropdown = styled(Dropdown)`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14.5px;
  line-height: 17px;
  width: 111px;
  height: 45px;
  letter-spacing: 0.01em;

  .Dropdown-control {
    border: 0;
    padding: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    height: 100%;
    padding: 6px;
  }

  .Dropdown-arrow-wrapper {
    display: flex;
  }

  .Dropdown-menu {
    border: 2px solid #ccc;
    width: 111px;
    margin-left: -2px;
    margin-top: 2px;
    border-radius: 2px;
  }
`

const InProgressDropdown = styled(BaseDropdown)`
  border: 2px solid ${theme.colorIconPrimary};

  .Dropdown-placeholder {
    color: ${theme.colorIconPrimary};
  }

  .Dropdown-arrow-wrapper > svg {
    stroke: ${theme.colorIconPrimary};
  }
`

const PausedDropdown = styled(BaseDropdown)`
  border: 2px solid #d29435;

  .Dropdown-placeholder {
    color: #d29435;
  }

  .Dropdown-arrow-wrapper > svg {
    stroke: #d29435;
  }
`

const DoneDropdown = styled(BaseDropdown)`
  border: 2px solid ${theme.colors.brand1.base};

  .Dropdown-placeholder {
    color: ${theme.colors.brand1.base};
  }

  .Dropdown-arrow-wrapper > svg {
    stroke: ${theme.colors.brand1.base};
  }
`

const DropdownLabel = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`

const StatusDropdown = ({ task, onStatusUpdate }) => {
  const status = {
    NOT_STARTED: 'Not started',
    START: 'Start',
    IN_PROGRESS: 'In progress',
    PAUSED: 'Paused',
    DONE: 'Done',
  }

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: ['getTasksQuery'],
  })

  const handleStatusUpdate = async taskStatus => {
    const { data } = await updateTaskStatus({
      variables: {
        task: {
          id: task.id,
          status: taskStatus,
        },
      },
    })

    onStatusUpdate(data.updateTaskStatus)
  }

  if (task.status === status.NOT_STARTED) {
    return (
      <StartButton onClick={() => handleStatusUpdate(status.IN_PROGRESS)}>
        Start
      </StartButton>
    )
  }

  let DropdownComponent = <></>

  const PauseLabel = (
    <DropdownLabel>
      <PauseIcon size={15} />
      <span>{task.status === status.PAUSED ? 'Paused' : 'Pause'}</span>
    </DropdownLabel>
  )

  const ContinueLabel = (
    <DropdownLabel>
      <span>
        {task.status === status.IN_PROGRESS ? 'In progress' : 'Continue'}
      </span>
    </DropdownLabel>
  )

  const DoneLabel = (
    <DropdownLabel>
      <CheckIcon size={15} />
      <span>Done</span>
    </DropdownLabel>
  )

  const dropdownOptions = [
    { label: ContinueLabel, value: status.IN_PROGRESS },
    { label: PauseLabel, value: status.PAUSED },
    { label: DoneLabel, value: status.DONE },
  ]

  switch (task.status) {
    case status.IN_PROGRESS:
      DropdownComponent = InProgressDropdown
      break
    case status.PAUSED:
      DropdownComponent = PausedDropdown
      break
    case status.DONE:
      DropdownComponent = DoneDropdown
      break
    default:
  }

  return (
    <DropdownComponent
      arrowClosed={<ChevronDown size={20} />}
      arrowOpen={<ChevronUp size={20} />}
      onChange={selected => handleStatusUpdate(selected.value)}
      options={dropdownOptions}
      placeholder="Select status"
      value={task.status}
    />
  )
}

export default StatusDropdown
