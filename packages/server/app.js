const config = require('config')
const { app } = require('@coko/server')
const { setConfig } = require('./modules/config/src/configObject')

setConfig({
  journal: config.journal,
  teams: config.teams,
  manuscripts: config.manuscripts,
  baseUrl: config['pubsweet-client'].baseUrl,
}) // TODO pass all client config that does not come from `Config` table through this structure or append it to config resolver

const { initiateJobSchedules } = require('./modules/utils/jobUtils')

initiateJobSchedules() // Initiate all job schedules

module.exports = app
