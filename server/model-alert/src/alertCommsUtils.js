const config = require('config')
const models = require('@pubsweet/models')
const sendEmailNotification = require('../../email-notifications')

const {
  getUserRolesInManuscript,
} = require('../../model-user/src/userCommsUtils')

const sendAlerts = async () => {
  // [TODO-1344]: add a comment describing the below query
  const notificationDigestRows = await models.NotificationDigest.query()
    .distinctOn(['user_id', 'path_string'])
    .where('max_notification_time', '<', new Date())
    .orderBy(['user_id', 'path_string', 'max_notification_time'])

  notificationDigestRows.forEach(async notificationDigest => {
    if (notificationDigest.actioned) return

    await sendAlertForMessage({
      userId: notificationDigest.userId,
      messageId: notificationDigest.header,
      title: 'Unread messages in channel',
    })

    // query to update all notificationdigest entries where user=user and path=path
    await models.NotificationDigest.query()
      .update({
        actioned: true,
      })
      .where({
        userId: notificationDigest.userId,
        pathString: notificationDigest.pathString,
      })
  })
}

const sendAlertForMessage = async ({
  userId,
  messageId,
  title,
  triggerTime = new Date(),
}) => {
  const user = await models.User.query().findById(userId)
  const message = await models.Message.query().findById(messageId)
  const channel = await models.Channel.query().findById(message.channelId)
  const { groupId } = channel
  const group = await models.Group.query().findById(groupId)

  // send email notification
  const baseUrl = `${config['pubsweet-client'].baseUrl}/${group.name}`

  let discussionUrl = baseUrl

  if (!channel.manuscriptId) {
    discussionUrl += `/admin/manuscripts` // admin discussion
  } else {
    discussionUrl += `/versions/${channel.manuscriptId}`
    const roles = await getUserRolesInManuscript(user.id, channel.manuscriptId)

    if (roles.groupManager || roles.anyEditor) {
      discussionUrl += '/decision'

      if (channel.type === 'editorial') {
        discussionUrl += '?discussion=editorial'
      }
    } else if (roles.reviewer) {
      discussionUrl += '/review'
    } else if (roles.author) {
      discussionUrl += '/submit'
    } else {
      discussionUrl = `${baseUrl}/dashboard`
    }
  }

  const data = {
    recipientName: user.username,
    discussionUrl,
  }

  const activeConfig = await models.Config.query().findOne({
    groupId,
    active: true,
  })

  const selectedTemplate =
    activeConfig.formData.eventNotification.alertUnreadMessageDigestTemplate

  if (!selectedTemplate) return

  const selectedEmailTemplate = await models.EmailTemplate.query().findById(
    selectedTemplate,
  )

  await sendEmailNotification(user.email, selectedEmailTemplate, data, groupId)

  await new models.Alert({
    title,
    userId: user.id,
    messageId,
    triggerTime,
    isSent: true,
  }).save()
}

const getNotificationOptionForUser = async ({ userId, type }) => {
  // [TODO-1344]: this function currently runs two queries to calculate the ['chat'] and [] options.
  // We should have a query that can help return all 2 values (or 3values when we also pass channel id in the path)
  let notificationUserOption = await models.NotificationUserOption.query()
    .where({ userId, path: ['chat'] })
    .first()

  if (notificationUserOption) {
    return notificationUserOption.option
  }

  notificationUserOption = await models.NotificationUserOption.query()
    .where({ userId, path: [] })
    .first()

  if (notificationUserOption) {
    return notificationUserOption.option
  }

  return '30MinDigest' // hardcoded default. [TODO-1344]: move to config
}

// [TODO-1344]: need to find a better file to store this event handler
const notificationEventHandler = async ({
  time,
  path,
  header,
  content,
  users,
  mentionedUsers,
}) => {
  users.forEach(async user => {
    const notificationUserOption = await getNotificationOptionForUser({
      userId: user.id,
      type: 'chatChannel', // [TODO-1344]: hardcoded, need to rethink these values
    })

    if (!notificationUserOption) return

    const maxNotificationTime = new Date(time)
    maxNotificationTime.setMinutes(maxNotificationTime.getMinutes() + 30)

    await new models.NotificationDigest({
      time,
      maxNotificationTime,
      pathString: path.join('/'),
      option: notificationUserOption,
      header,
      content,
      userId: user.id,
      userIsMentioned: false, // hardcoded for now until we built the @ tagging feature
    }).save()
  })
}

module.exports = {
  sendAlerts,
  sendAlertForMessage,
  getNotificationOptionForUser,
  notificationEventHandler,
}
