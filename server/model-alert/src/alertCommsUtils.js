const config = require('config')
const models = require('@pubsweet/models')
const sendEmailNotification = require('../../email-notifications')

const {
  getUserRolesInManuscript,
} = require('../../model-user/src/userCommsUtils')

const sendAlerts = async () => {
  const channelMembers = await models.ChannelMember.query()
    .whereNull('lastAlertTriggeredTime')
    .where(
      'lastViewed',
      '<',
      new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    )
    .withGraphJoined('user')

  channelMembers.forEach(async channelMember => {
    // Check if notification preference is true for the user
    if (!channelMember.user.eventNotificationsOptIn) {
      return
    }

    // check if there are messages in the channel that have a larger timestamp than channelMemberlastviewed
    const earliestUnreadMessage = await models.Message.query()
      .where({ channelId: channelMember.channelId })
      .where('created', '>', channelMember.lastViewed)
      .orderBy('created')
      .first()

    if (!earliestUnreadMessage) {
      return
    }

    await sendAlertForMessage({
      user: channelMember.user,
      messageId: earliestUnreadMessage.id,
      title: 'Unread messages in channel',
    })

    await models.ChannelMember.query().updateAndFetchById(channelMember.id, {
      lastAlertTriggeredTime: new Date(),
    })
  })
}

const sendAlertForMessage = async ({
  user,
  messageId,
  title,
  triggerTime = new Date(),
}) => {
  const message = await models.Message.query().findById(messageId)
  const channel = await models.Channel.query().findById(message.channelId)

  // send email notification
  const urlFrag = config.journal.metadata.toplevel_urlfragment
  const baseUrl = config['pubsweet-client'].baseUrl + urlFrag

  let discussionLink = baseUrl

  if (!channel.manuscriptId) {
    discussionLink += `/admin/manuscripts` // admin discussion
  } else {
    discussionLink += `/versions/${channel.manuscriptId}`
    const roles = await getUserRolesInManuscript(user.id, channel.manuscriptId)

    if (roles.groupManager || roles.anyEditor) {
      discussionLink += '/decision'

      if (channel.type === 'editorial') {
        discussionLink += '?discussion=editorial'
      }
    } else if (roles.reviewer) {
      discussionLink += '/review'
    } else if (roles.author) {
      discussionLink += '/submit'
    } else {
      discussionLink = `${baseUrl}/dashboard`
    }
  }

  const data = {
    receiverName: user.username,
    discussionLink,
  }

  await sendEmailNotification(
    user.email,
    'alertUnreadMessageDigestTemplate',
    data,
  )

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
    return notificationUserOption.option === '30MinDigest'
  }

  notificationUserOption = await models.NotificationUserOption.query()
    .where({ userId, path: [] })
    .first()

  if (notificationUserOption) {
    return notificationUserOption.option === '30MinDigest'
  }

  return true // hardcoded default. [TODO-1344]: move to config
}

// [TODO-1344]: need to find a better file to store this event handler
const notificationEventHandler = ({
  time,
  path,
  header,
  content,
  users,
  mentionedUsers,
}) => {}

module.exports = {
  sendAlerts,
  sendAlertForMessage,
  getNotificationOptionForUser,
  notificationEventHandler,
}
