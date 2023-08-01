const { useTransaction, logger } = require('@coko/server')

/* eslint-disable import/no-unresolved, import/extensions */
const Team = require('../modules/model-team/src/team')
const Group = require('../modules/model-group/src/group')
/* eslint-enable import/no-unresolved, import/extensions */

exports.up = async knex => {
  try {
    return useTransaction(async trx => {
      const groups = await Group.query(trx)

      logger.info(`Existing groups count: ${groups.length}`)

      if (groups.length === 0) {
        const orphanedGroupManagerRecord = await Team.query(trx).findOne({
          role: 'groupManager',
          global: true,
          objectId: null,
          objectType: null,
          type: 'team',
        })

        if (orphanedGroupManagerRecord) {
          orphanedGroupManagerRecord.delete()
          logger.info(`Removed orphaned group manager team record.`)
        }
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}
