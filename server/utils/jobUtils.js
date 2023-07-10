const models = require('@pubsweet/models')
const ScheduleManager = require('./scheduleManager')

const {
  importManuscripts,
  importManuscriptsFromSemanticScholar,
} = require('../model-manuscript/src/importManuscripts')

const {
  archiveOldManuscripts,
} = require('../model-manuscript/src/manuscriptCommsUtils')

const {
  createNewTaskAlerts,
  sendAutomatedTaskEmailNotifications,
} = require('../model-task/src/taskCommsUtils')

const getJobs = async (activeConfig, groupId) => {
  const jobs = []

  if (activeConfig.formData.manuscript.autoImportHourUtc) {
    // Job 1: Importing and archiving Manuscripts
    jobs.push({
      name: 'Importing and archiving Manuscripts',
      rule: {
        tz: 'Etc/UTC',
        rule: `00 ${activeConfig.formData.manuscript.autoImportHourUtc} * * *`,
      },
      fn: async () => {
        // eslint-disable-next-line no-console
        console.info(
          `Running scheduler for importing and archiving Manuscripts at ${new Date().toISOString()}`,
        )

        try {
          await importManuscripts(groupId, { user: null })
          await importManuscriptsFromSemanticScholar(groupId, {
            user: null,
          })
          await archiveOldManuscripts(groupId)
        } catch (error) {
          console.error(error)
        }
      },
    })
  }

  jobs.push(
    // Job 2: Tracking overdue tasks
    {
      name: 'Tracking overdue tasks',
      rule: {
        tz: `${activeConfig.formData.taskManager.teamTimezone || 'Etc/UTC'}`,
        rule: `00 00 * * *`,
      },
      fn: async () => {
        // eslint-disable-next-line no-console
        console.info(
          `Running scheduler for tracking overdue tasks ${new Date().toISOString()}`,
        )

        try {
          await createNewTaskAlerts(groupId)
        } catch (error) {
          console.error(error)
        }
      },
    },
    // Job 3: Sending task email notifications
    {
      name: 'Sending task email notifications',
      rule: {
        tz: `${activeConfig.formData.taskManager.teamTimezone || 'Etc/UTC'}`,
        rule: `00 00 * * *`,
      },
      fn: async () => {
        // eslint-disable-next-line no-console
        console.info(
          `Running scheduler for sending task email notifications ${new Date().toISOString()}`,
        )

        try {
          await sendAutomatedTaskEmailNotifications(groupId)
        } catch (error) {
          console.error(error)
        }
      },
    },
    // Other new jobs..
  )

  return jobs
}

const initiateJobSchedules = async () => {
  const groups = await models.Group.query().where({ isArchived: false })

  groups.forEach(async group => {
    const activeConfig = await models.Config.query().findOne({
      groupId: group.id,
      active: true,
    })

    const jobs = await getJobs(activeConfig, group.id)

    // eslint-disable-next-line no-console
    console.info(`Schedule Jobs for group "${group.name}"`)
    jobs.forEach(job => {
      const schedule = new ScheduleManager()
      schedule.start(job.name, job.rule, job.fn)
    })
  })
}

module.exports = {
  getJobs,
  initiateJobSchedules,
}
