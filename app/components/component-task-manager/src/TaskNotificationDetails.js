import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SelectEmailTemplate from '../../component-review/src/components/emailNotifications/SelectEmailTemplate'
import { RoundIconButton, Select, TextInput } from '../../shared'
import SecondaryActionButton from '../../shared/SecondaryActionButton'
import CounterFieldWithOptions from '../../shared/CounterFieldWithOptions'
import CounterField from '../../shared/CounterField'
import theme from '../../../theme'
import { emailNotifications } from '../../../../config/journal/tasks.json'

const TaskTitle = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizeBase};
  line-height: 19px;
  letter-spacing: 0.01em;
  color: ${theme.colors.neutral.gray20};
  margin-bottom: 4px;
`

const TaskFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;

  + div {
    margin-left: 20px;
  }
`

const RecipientFieldContainer = styled(TaskFieldsContainer)`
  flex: 0 0 20em;
`

const EmailTemplateFieldContainer = styled(TaskFieldsContainer)`
  flex: 0 0 15em;

  div {
    font-size: ${theme.fontSizeBase};
  }

  > div:nth-child(2) > div:nth-child(2) {
    height: 45px;
  }
`

const ScheduleNotificationFieldContainer = styled(TaskFieldsContainer)`
  flex: 0 0 22em;
`

const SendNowActionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 22px;
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
  height: 45px;

  & > div {
    margin: 0px 10px;
  }

  color: ${props => (props.disabled ? theme.colorBorder : 'inherit')};
`

const UnregisteredUserCell = styled.div`
  display: flex;

  > input {
    margin-top: 10px;

    + input {
      margin-left: 10px;
    }
  }
`

const NotificationDeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NotificationDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  & + div {
    margin-top: 16px;
  }
`

const AssigneeCell = styled.div`
  justify-content: flex-start;
  line-height: 1em;

  > div > div {
    font-size: ${theme.fontSizeBase};
    line-height: 1.25;

    &:nth-child(2) {
      height: 45px;
    }
  }
`

const TaskNotificationDetails = ({
  updateTaskNotification,
  recipientGroupedOptions,
  taskEmailNotification: propTaskEmailNotification,
  deleteTaskNotification,
  task,
  manuscript,
  currentUser,
  sendNotifyEmail,
  editAsTemplate,
  createTaskEmailNotificationLog,
  selectedDurationDays,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const { recipientTypes } = emailNotifications

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
    taskEmailNotification.recipientType === recipientTypes.UNREGISTERED_USER,
  )

  const [taskNotificationStatus, setTaskNotificationStatus] = useState(null)

  const [recipientDropdownState, setRecipientDropdownState] = useState(false)

  let notificationOption

  const notificationElapsedDays = Math.abs(
    taskEmailNotification?.notificationElapsedDays,
  )

  if (taskEmailNotification?.notificationElapsedDays < 0) {
    notificationOption = 'before'
  }

  if (taskEmailNotification?.notificationElapsedDays > 0) {
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

    if (!selectedOption) {
      setIsNewRecipient(false)
      updateTaskNotification({
        ...taskNotification,
        id: taskNotification.id,
        taskId: taskNotification.taskId,
        recipientUserId: null,
        recipientType: null,
        recipientEmail: null,
        recipientName: null,
      })
      return
    }

    switch (selectedOption.key) {
      case 'userRole':
        setIsNewRecipient(false)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: null,
          recipientType: selectedOption.value,
          recipientEmail: null,
          recipientName: null,
        })

        break
      case recipientTypes.REGISTERED_USER:
        setIsNewRecipient(false)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: selectedOption?.value,
          recipientType: recipientTypes.REGISTERED_USER,
          recipientEmail: null,
          recipientName: null,
        })

        break
      case recipientTypes.ASSIGNEE:
        setIsNewRecipient(false)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: null,
          recipientType: recipientTypes.ASSIGNEE,
          recipientEmail: null,
          recipientName: null,
        })

        break
      case recipientTypes.UNREGISTERED_USER:
        setIsNewRecipient(true)
        updateTaskNotification({
          ...taskNotification,
          id: taskNotification.id,
          taskId: taskNotification.taskId,
          recipientUserId: null,
          recipientType: recipientTypes.UNREGISTERED_USER,
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

  const handleManuscriptTeamInputForNotification = (
    notificationRecipientType,
    manuscriptTeams,
  ) => {
    const teamsOfRecipientType = manuscriptTeams.filter(team => {
      if (notificationRecipientType === 'editor') {
        return ['editor', 'handlingEditor', 'seniorEditor'].includes(team.role)
      }

      return team.role === notificationRecipientType
    })

    let logsData
    const logsDataArray = []

    const prepareEmailRecipients = () => {
      return new Promise((resolve, reject) => {
        let emailSuccess = true
        let emailCount = 0

        if (teamsOfRecipientType.length === 0) {
          emailSuccess = false
        }

        const totalEmails = teamsOfRecipientType.reduce(
          (sum, team) => sum + team.members.length,
          0,
        )

        const promises = []

        // eslint-disable-next-line no-restricted-syntax
        for (const team of teamsOfRecipientType) {
          // eslint-disable-next-line no-restricted-syntax
          for (const member of team.members) {
            const input = {
              selectedEmail: member.user.email,
              selectedTemplate: taskEmailNotification.emailTemplateKey,
              manuscript,
              currentUser: currentUser.username,
            }

            logsData = {
              selectedTemplate: taskEmailNotification.emailTemplateKey,
              recipientName: member.user.username,
              recipientEmail: member.user.email,
              senderEmail: currentUser.email,
            }

            promises.push(
              sendNotifyEmail(input)
                // eslint-disable-next-line no-loop-func
                .then(response => {
                  const responseStatus = response.data.sendEmail.success

                  if (!responseStatus) {
                    emailSuccess = false
                    reject(new Error('Sending email failed'))
                    emailCount += 1
                  } else {
                    logsDataArray.push(logsData)
                  }

                  if (emailCount === totalEmails) {
                    resolve(emailSuccess)
                  }
                })
                // eslint-disable-next-line no-loop-func
                .catch(error => {
                  emailSuccess = false
                  reject(error)
                }),
            )
          }
        }

        Promise.all(promises).then(() => {
          resolve(emailSuccess)
        })
      })
    }

    return prepareEmailRecipients().then(emailStatus => {
      if (emailStatus) {
        updateTaskNotification({
          ...taskEmailNotification,
          sentAt: new Date(),
        })
        logTaskNotificationEmails(logsDataArray)
      }

      return emailStatus
    })
  }

  const sendTaskNotificationEmailHandler = async () => {
    setTaskNotificationStatus('pending')

    if (taskEmailNotification.recipientType) {
      let input
      let response
      let responseStatus
      let logsData = []

      switch (taskEmailNotification.recipientType) {
        case recipientTypes.UNREGISTERED_USER:
          input = {
            externalEmail: taskEmailNotification.recipientEmail,
            externalName: taskEmailNotification.recipientName,
            selectedTemplate: taskEmailNotification.emailTemplateKey,
            currentUser: currentUser.username,
            manuscript,
          }
          logsData = [
            {
              selectedTemplate: taskEmailNotification.emailTemplateKey,
              recipientName: taskEmailNotification.recipientName,
              recipientEmail: taskEmailNotification.recipientEmail,
              senderEmail: currentUser.email,
            },
          ]
          response = await sendNotifyEmail(input)
          responseStatus = response.data.sendEmail.success

          if (responseStatus) {
            updateTaskNotification({
              ...taskEmailNotification,
              sentAt: new Date(),
            })
            logTaskNotificationEmails(logsData)
          }

          setTaskNotificationStatus(responseStatus ? 'success' : 'failure')
          break
        case recipientTypes.REGISTERED_USER:
          input = {
            selectedEmail: taskEmailNotification.recipientUser.email,
            selectedTemplate: taskEmailNotification.emailTemplateKey,
            manuscript,
            currentUser: currentUser.username,
          }
          logsData = [
            {
              selectedTemplate: taskEmailNotification.emailTemplateKey,
              recipientName: taskEmailNotification.recipientUser.username,
              recipientEmail: taskEmailNotification.recipientUser.email,
              senderEmail: currentUser.email,
            },
          ]
          response = await sendNotifyEmail(input)
          responseStatus = response.data.sendEmail.success

          if (responseStatus) {
            updateTaskNotification({
              ...taskEmailNotification,
              sentAt: new Date(),
            })
            logTaskNotificationEmails(logsData)
          }

          setTaskNotificationStatus(responseStatus ? 'success' : 'failure')
          break
        case recipientTypes.ASSIGNEE:
          switch (task.assigneeType) {
            case recipientTypes.UNREGISTERED_USER:
              input = {
                externalEmail: task.assigneeEmail,
                externalName: task.assigneeName,
                selectedTemplate: taskEmailNotification.emailTemplateKey,
                currentUser: currentUser.username,
                manuscript,
              }
              logsData = [
                {
                  selectedTemplate: taskEmailNotification.emailTemplateKey,
                  recipientName: task.assigneeName,
                  recipientEmail: task.assigneeEmail,
                  senderEmail: currentUser.email,
                },
              ]
              response = await sendNotifyEmail(input)
              responseStatus = response.data.sendEmail.success

              if (responseStatus) {
                updateTaskNotification({
                  ...taskEmailNotification,
                  sentAt: new Date(),
                })
                logTaskNotificationEmails(logsData)
              }

              setTaskNotificationStatus(responseStatus ? 'success' : 'failure')
              break
            case recipientTypes.REGISTERED_USER:
              input = {
                selectedEmail: task.assignee.email,
                selectedTemplate: taskEmailNotification.emailTemplateKey,
                manuscript,
                currentUser: currentUser.username,
              }

              logsData = [
                {
                  selectedTemplate: taskEmailNotification.emailTemplateKey,
                  recipientName: task.assignee.username,
                  recipientEmail: task.assignee.email,
                  senderEmail: currentUser.email,
                },
              ]
              response = await sendNotifyEmail(input)
              responseStatus = response.data.sendEmail.success

              if (responseStatus) {
                updateTaskNotification({
                  ...taskEmailNotification,
                  sentAt: new Date(),
                })
                logTaskNotificationEmails(logsData)
              }

              setTaskNotificationStatus(responseStatus ? 'success' : 'failure')
              break
            case 'editor':
            case 'reviewer':
            case 'author':
              responseStatus = handleManuscriptTeamInputForNotification(
                task.assigneeType,
                manuscript.teams,
              )
                .then(emailStatus => {
                  setTaskNotificationStatus(emailStatus ? 'success' : 'failure')
                })
                .catch(error => {
                  console.error(error)
                  setTaskNotificationStatus('failure')
                })
              break
            default:
          }

          break
        case 'editor':
        case 'reviewer':
        case 'author':
          responseStatus = handleManuscriptTeamInputForNotification(
            taskEmailNotification.recipientType,
            manuscript.teams,
          )
            .then(emailStatus => {
              setTaskNotificationStatus(emailStatus ? 'success' : 'failure')
            })
            .catch(error => {
              console.error(error)
              setTaskNotificationStatus('failure')
            })
          break
        default:
      }
    }
  }

  const logTaskNotificationEmails = async logsData => {
    // eslint-disable-next-line no-restricted-syntax
    for (const logData of logsData) {
      const emailTemplateOption = logData.selectedTemplate.replace(
        /([A-Z])/g,
        ' $1',
      )

      const selectedTemplateValue =
        emailTemplateOption.charAt(0).toUpperCase() +
        emailTemplateOption.slice(1)

      const messageBody = `${selectedTemplateValue} sent by Kotahi to ${logData.recipientName}`

      // eslint-disable-next-line no-await-in-loop
      await createTaskEmailNotificationLog({
        variables: {
          taskEmailNotificationLog: {
            taskId: task.id,
            content: messageBody,
            emailTemplateKey: emailTemplateOption,
            senderEmail: logData.senderEmail,
            recipientEmail: logData.recipientEmail,
          },
        },
      })
    }
  }

  return (
    <NotificationDetailsContainer>
      <RecipientFieldContainer>
        <TaskTitle>Recipient</TaskTitle>
        <AssigneeCell title={taskEmailNotification.recipientType}>
          <Select
            aria-label="Recipient"
            data-testid="Recipient_select"
            dropdownState={recipientDropdownState}
            hasGroupedOptions
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
            <TextInput
              onChange={e => {
                setRecipientEmail(e.target.value)
                updateTaskNotification({
                  ...taskEmailNotification,
                  recipientUserId: null,
                  recipientType: recipientTypes.UNREGISTERED_USER,
                  recipientEmail: e.target.value,
                })
              }}
              placeholder="Email"
              value={recipientEmail}
            />
            <TextInput
              onChange={e => {
                setRecipientName(e.target.value)
                updateTaskNotification({
                  ...taskEmailNotification,
                  recipientUserId: null,
                  recipientType: recipientTypes.UNREGISTERED_USER,
                  recipientName: e.target.value,
                })
              }}
              placeholder="Name"
              value={recipientName}
            />
          </UnregisteredUserCell>
        )}
      </RecipientFieldContainer>
      <EmailTemplateFieldContainer>
        <TaskTitle>Select email template</TaskTitle>
        <SelectEmailTemplate
          isClearable
          onChangeEmailTemplate={setSelectedTemplate}
          placeholder="Select email template"
          selectedEmailTemplate={
            selectedTemplate || taskEmailNotification.emailTemplateKey
          }
          task={task}
          taskEmailNotification={taskEmailNotification}
          updateTaskNotification={updateTaskNotification}
        />
      </EmailTemplateFieldContainer>
      <ScheduleNotificationFieldContainer>
        <NotificationDeadlineContainer>
          <TaskTitle>Send notification</TaskTitle>
          <NotificationDeadlineCell disabled={selectedDurationDays === null}>
            <span>Send</span>
            <CounterField
              compact
              disabled={selectedDurationDays === null}
              minValue={0}
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
            <span>days</span>
            <CounterFieldWithOptions
              disabled={selectedDurationDays === null}
              onChange={selected => {
                if (selected && selected.value) {
                  setTaskEmailNotificationDeadline(selected.value)
                  handleTaskNotificationDeadline(
                    selected.value,
                    taskEmailNotificationElapsedDays,
                    taskEmailNotification,
                  )
                }
              }}
              options={[
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
              ]}
              value={taskEmailNotificationDeadline || 'before'}
            />
            <span>due date</span>
          </NotificationDeadlineCell>
        </NotificationDeadlineContainer>
      </ScheduleNotificationFieldContainer>
      {!editAsTemplate && (
        <SendNowActionContainer>
          <SecondaryActionButton
            onClick={sendTaskNotificationEmailHandler}
            status={taskNotificationStatus}
          >
            Send Now
          </SecondaryActionButton>
        </SendNowActionContainer>
      )}
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