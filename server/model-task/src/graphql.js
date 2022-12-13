const Task = require('./task')
const TaskAlert = require('./taskAlert')
const TaskEmailNotification = require('./taskEmailNotification')

const {
  createNewTaskAlerts,
  updateAlertsForTask,
} = require('./taskCommsUtils')

const resolvers = {
  Mutation: {
    updateTasks: async (_, { manuscriptId, tasks }) => {
      // Remove any tasks with repeated IDs; ensure manuscriptIds all match
      const distinctTasks = tasks
        .filter((task, i) => tasks.findIndex(t => t.id === task.id) === i)
        .map(task => ({
          ...task,
          dueDate: new Date(task.dueDate),
          manuscriptId,
        }))

      const currentTaskIdRecords = await Task.query()
        .select('id')
        .where({ manuscriptId })

      const idsToDelete = currentTaskIdRecords
        .filter(record => !distinctTasks.some(t => t.id === record.id))
        .map(record => record.id)

      return Task.transaction(async () => {
        await Task.query().delete().whereIn('id', idsToDelete)

        const promises = []

        for (let i = 0; i < distinctTasks.length; i += 1) {
          const task = { ...distinctTasks[i], manuscriptId, sequenceIndex: i }
          promises.push(
            Task.query()
              .insert(task)
              .onConflict('id')
              .merge()
              .returning('*')
              .withGraphFetched('assignee'),
          )
        }

        const result = (await Promise.all(promises)).sort(
          (a, b) => a.sequenceIndex - b.sequenceIndex,
        )

        await Promise.all(result.map(task => updateAlertsForTask(task)))
        return result
      })
    },
    updateTask: async (_, { task }) => {
      const currentCount = await Task.query()
        .where({ manuscriptId: task.manuscriptId })
        .resultSize()

      const existing = await Task.query().findById(task.id)

      // Ensure that we can't switch a task from one manuscript to another
      const manuscriptId = existing ? existing.manuscriptId : task.manuscriptId
      const sequenceIndex = existing ? existing.sequenceIndex : currentCount
      const taskRecord = { ...task, manuscriptId, sequenceIndex }

      await updateAlertsForTask(taskRecord)

      return Task.query()
        .insert(taskRecord)
        .onConflict('id')
        .merge()
        .returning('*')
        .withGraphFetched('assignee')
    },

    createNewTaskAlerts: async () => createNewTaskAlerts(), // For testing purposes. Normally initiated by a scheduler on the server.

    removeTaskAlertsForCurrentUser: async (_, __, ctx) =>
      TaskAlert.query().delete().where({ userId: ctx.user }),

    createTaskEmailNotification: async (_, { taskEmailNotification }) => (
      TaskEmailNotification.query()
        .insert(taskEmailNotification)
        .onConflict('id')
        .merge()
        .returning('*')
    ),
    updateTaskEmailNotification: async (_, { id, taskEmailNotification }) => (
      TaskEmailNotification.query()
        .update(taskEmailNotification)
        .where({ id })
    ),
    deleteTaskEmailNotification: async (_, { id }) => TaskEmailNotification.query().delete().where({ id }),
  },
  Query: {
    tasks: async (_, { manuscriptId }) => {
      return Task.query()
        .where({ manuscriptId })
        .orderBy('sequenceIndex')
        .withGraphJoined('assignee')
        .withGraphJoined('emailNotifications')
    },
    userHasTaskAlerts: async (_, __, ctx) => {
      return (
        (await TaskAlert.query().where({ userId: ctx.user }).limit(1)).length >
        0
      )
    },
    taskEmailNotifications: () => TaskEmailNotification.query(),
    taskEmailNotification: (_, { id }) => TaskEmailNotification.query().where({ id }),
  },
}

const typeDefs = `
  input TaskInput {
    id: ID!
    manuscriptId: ID
    title: String!
    assigneeUserId: ID
    defaultDurationDays: Int
    dueDate: DateTime
    reminderPeriodDays: Int
    status: String!
  }

  type Task {
    id: ID!
    created: DateTime!
    updated: DateTime
    manuscriptId: ID
    title: String!
    assigneeUserId: ID
    assignee: User
    defaultDurationDays: Int
    dueDate: DateTime
    reminderPeriodDays: Int
    sequenceIndex: Int!
    status: String!
    emailNotifications: [TaskEmailNotification]
  }

  type TaskAlert {
    taskId: ID
    assigneeUserId: ID
  }

  extend type Query {
    tasks(manuscriptId: ID): [Task!]!
    userHasTaskAlerts: Boolean!
    taskEmailNotifications: [TaskEmailNotification]!
    taskEmailNotification(id: ID!): TaskEmailNotification!
  }

  input TaskEmailNotificationCreateInput {
    taskId: ID!
    recipientUserId: ID
    isRecipientAssignee: Boolean
    recipientRole: String
    notificationElapsedDays: Int
    emailTemplateKey: String
  }

  input TaskEmailNotificationUpdateInput {
    taskId: ID
    recipientUserId: ID
    isRecipientAssignee: Boolean
    recipientRole: String
    notificationElapsedDays: Int
    emailTemplateKey: String
  }

  type TaskEmailNotification {
    id: ID!
    created: DateTime!
    updated: DateTime
    taskId: ID!
    recipientUserId: ID
    isRecipientAssignee: Boolean
    recipientRole: String
    notificationElapsedDays: Int
    emailTemplateKey: String
  }

  extend type Mutation {
    updateTasks(manuscriptId: ID, tasks: [TaskInput!]!): [Task!]!
    updateTask(task: TaskInput!): Task!
    createNewTaskAlerts: Boolean
    removeTaskAlertsForCurrentUser: Boolean
    createTaskEmailNotification(taskEmailNotification: TaskEmailNotificationCreateInput!): TaskEmailNotification!
    updateTaskEmailNotification(taskEmailNotification: TaskEmailNotificationUpdateInput!): TaskEmailNotification!
    deleteTaskEmailNotification(id: ID!): Boolean!
  }
`

module.exports = { typeDefs, resolvers }
