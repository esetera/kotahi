import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { TextField } from '@pubsweet/ui'
import SelectEmailTemplate from '../../component-review/src/components/emailNotifications/SelectEmailTemplate'
import {
  MinimalNumericUpDown,
  GroupedOptionsSelect,
  MinimalSelect,
  RoundIconButton,
} from '../../shared'

const TaskTitle = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #323232;
  margin-bottom: 4px;
`

const TaskFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-right: 20px;
`

const RoundIconButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 18%;
  & > button > span {
    padding: 0;
  }
  & > button {
    min-width: 0px;
    height: 25px;
    width: 25px;
    margin-top: 25px;
  }
  & > button > svg {
    width: 18px;
  }
`

const NotificationDeadlineCell = styled.div`
  display: flex;
  align-items: center;
  & > div {
    margin: 0px 10px;
  }
`

const InputField = styled(TextField)`
  height: 40px;
  margin-bottom: 0;
`

const UnregisteredUserCell = styled.div`
  display: flex;
  & > div {
    margin: 20px 20px 0px 0px;
  }
`

const NotificationDeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`

const NotificationDetailsContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
`

const AssigneeCell = styled.div`
  justify-content: flex-start;
`

const TaskNotificationDetails = ({
  updateTaskNotification,
  recipientGroupedOptions,
  notificationOptions,
  taskEmailNotification: propTaskEmailNotification,
  deleteTaskNotification,
  task,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const [taskEmailNotification, setTaskNotification] = useState(
    propTaskEmailNotification,
  )

  useEffect(() => {
    setTaskNotification(propTaskEmailNotification)
  }, [propTaskEmailNotification])

  const [recipientEmail, setRecipientEmail] = useState(
    taskEmailNotification.recipientEmail,
  )

  const [recipientName, setRecipientName] = useState(
    taskEmailNotification.recipientName,
  )

  const [isNewRecipient, setIsNewRecipient] = useState(
    taskEmailNotification.recipientType === 'unregisteredUser',
  )

  const [recipientDropdownState, setRecipientDropdownState] = useState(false)

  let notificationOption

  const notificationElapsedDays = Math.abs(
    taskEmailNotification?.notificationElapsedDays,
  )

  if (Math.sign(taskEmailNotification?.notificationElapsedDays) === -1) {
    notificationOption = 'before'
  }

  if (Math.sign(taskEmailNotification?.notificationElapsedDays) === 1) {
    notificationOption = 'after'
  }

  const [
    taskEmailNotificationDeadline,
    setTaskEmailNotificationDeadline,
  ] = useState(notificationOption)

  const [
    taskEmailNotificationElapsedDays,
    setTaskEmailNotificationElapsedDays,
  ] = useState(notificationElapsedDays)

  function handleRecipientInput(selectedOption, taskNotification) {
    setRecipientDropdownState(selectedOption)

    switch (selectedOption.key) {
      case 'userRole':
        setIsNewRecipient(false)
        updateTaskNotification({
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: null,
          recipientType: selectedOption.value,
          recipientEmail: null,
          recipientName: null,
        })

        break
      case 'registeredUser':
        setIsNewRecipient(false)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: selectedOption?.value,
          recipientType: 'registeredUser',
          recipientEmail: null,
          recipientName: null,
        })

        break
      case 'assignee':
        setIsNewRecipient(false)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: null,
          recipientType: 'assignee',
          recipientEmail: null,
          recipientName: null,
        })

        break
      case 'unregisteredUser':
        setIsNewRecipient(true)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: null,
          recipientType: 'assignee',
          recipientEmail: null,
          recipientName: null,
        })

        break
      default:
    }
  }

  function handleTaskNotificationDeadline(
    deadlineOption,
    elapsedDays,
    taskNotification,
  ) {
    let elapsedDaysValue = elapsedDays

    if (deadlineOption === 'before') {
      elapsedDaysValue = -Math.abs(elapsedDaysValue)
    }

    updateTaskNotification({
      ...taskNotification,
      id: taskNotification.id,
      taskId: taskNotification.taskId,
      notificationElapsedDays: elapsedDaysValue,
    })
  }

  return (
    <NotificationDetailsContainer>
      <TaskFieldsContainer>
        <TaskTitle>Recipient</TaskTitle>
        <AssigneeCell title={taskEmailNotification.recipientType}>
          <GroupedOptionsSelect
            aria-label="Recipient"
            data-testid="Recipient_select"
            dropdownState={recipientDropdownState}
            isClearable
            label="Recipient"
            onChange={selected =>
              handleRecipientInput(selected, taskEmailNotification)
            }
            options={recipientGroupedOptions}
            placeholder="Select a recipient"
            value={
              taskEmailNotification?.recipientUserId ||
              taskEmailNotification?.recipientType
            }
          />
        </AssigneeCell>
        {isNewRecipient && (
          <UnregisteredUserCell>
            <InputField
              data-cy="new-user-email"
              onChange={e => {
                setRecipientEmail(e.target.value)
                updateTaskNotification({
                  ...taskEmailNotification,
                  recipientUserId: null,
                  recipientType: 'unregisteredUser',
                  recipientEmail: e.target.value,
                })
              }}
              placeholder="Email"
              value={recipientEmail}
            />
            <InputField
              data-cy="new-user-name"
              onChange={e => {
                setRecipientName(e.target.value)
                updateTaskNotification({
                  ...taskEmailNotification,
                  recipientUserId: null,
                  recipientType: 'unregisteredUser',
                  recipientName: e.target.value,
                })
              }}
              placeholder="Name"
              value={recipientName}
            />
          </UnregisteredUserCell>
        )}
      </TaskFieldsContainer>
      <TaskFieldsContainer>
        <TaskTitle>Select email template</TaskTitle>
        <SelectEmailTemplate
          isTaskEmailNotification
          onChangeEmailTemplate={setSelectedTemplate}
          selectedEmailTemplate={
            selectedTemplate || taskEmailNotification.emailTemplateKey
          }
          task={task}
          taskEmailNotification={taskEmailNotification}
          updateTaskNotification={updateTaskNotification}
        />
      </TaskFieldsContainer>
      <TaskFieldsContainer>
        <NotificationDeadlineContainer>
          <TaskTitle>Send notification</TaskTitle>

          <NotificationDeadlineCell>
            Send
            <MinimalNumericUpDown
              onChange={val => {
                setTaskEmailNotificationElapsedDays(val)
                handleTaskNotificationDeadline(
                  taskEmailNotificationDeadline,
                  val,
                  taskEmailNotification,
                )
              }}
              value={taskEmailNotificationElapsedDays || 0}
            />
            Days
            <MinimalSelect
              aria-label="Deadline"
              data-testid="Deadline_select"
              isClearable
              label="Deadline"
              onChange={selected => {
                setTaskEmailNotificationDeadline(selected.value)
                handleTaskNotificationDeadline(
                  selected.value,
                  taskEmailNotificationElapsedDays,
                  taskEmailNotification,
                )
              }}
              options={notificationOptions}
              placeholder="Select.."
              value={taskEmailNotificationDeadline}
            />
          </NotificationDeadlineCell>
        </NotificationDeadlineContainer>
      </TaskFieldsContainer>
      <RoundIconButtonContainer>
        <RoundIconButton
          iconName="Minus"
          onClick={() =>
            deleteTaskNotification({
              variables: { id: taskEmailNotification.id },
            })
          }
          secondary
          title="Delete Notification"
        />
      </RoundIconButtonContainer>
    </NotificationDetailsContainer>
  )
}

export default TaskNotificationDetails
