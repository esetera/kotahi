module.exports = {
  status: {
    NOT_STARTED: 'Not started',
    START: 'Start',
    IN_PROGRESS: 'In progress',
    PAUSED: 'Paused',
    DONE: 'Done',
  },
  assigneeTypes: {
    UNREGISTERED_USER: 'unregisteredUser',
    REGISTERED_USER: 'registeredUser',
    EDITOR: 'editor',
    REVIEWER: 'reviewer',
    SENIOR_EDITOR: 'seniorEditor',
    HANDLING_EDITOR: 'handlingEditor',
    AUTHOR: 'author',
  },
  emailNotifications: {
    recipientTypes: {
      UNREGISTERED_USER: 'unregisteredUser',
      REGISTERED_USER: 'registeredUser',
      ASSIGNEE: 'assignee',
      EDITOR: 'editor',
      REVIEWER: 'reviewer',
      SENIOR_EDITOR: 'seniorEditor',
      HANDLING_EDITOR: 'handlingEditor',
      AUTHOR: 'author',
    },
  },
}
