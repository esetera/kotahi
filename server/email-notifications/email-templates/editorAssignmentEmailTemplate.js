const EditorAssignmentEmailTemplate = ({
  articleTitle,
  authorName,
  receiverFirstName,
  shortId,
}) => {
  const result = {
    cc: '',
    subject: 'Kotahi Notificaion Email',
    content: '',
  }

  switch (process.env.INSTANCE_NAME) {
    case 'aperture':
      result.cc = 'aperture@humanbrainmapping.org'
      result.subject = 'Aperture Neuro Submission Ready for Handling Editor'
      result.content = `<p>
      <p>Dear ${receiverFirstName},</p>
      <p>You have been assigned the following Research Object to Handle:</p>
      <p>“${shortId}; ${articleTitle}, ${authorName}”</p>
      <p>To access the submission please log onto the Aperture Submission Kotahi platform at <a href="https://apertureneuro.cloud68.co/login" target="_blank">https://apertureneuro.cloud68.co/login</a>.</p>
      <p>If you have any questions or trouble accessing the submission, please contact the Journal Manager at aperture@humanbrainmapping.org.</p>
      <p>Sincerely,</p>
      <p>Tonya White, MD, PhD</p>
      <p>Editor-in-Chief <br>
      Aperture Neuro
      </p>
    </p>`
      break
    default:
      result.subject = 'Submission Ready for Handling Editor'
      result.content = `<p>
      <p>Dear ${receiverFirstName},</p>
      <p>You have been assigned the following Research Object to Handle:</p>
      <p>“${shortId}; ${articleTitle}, ${authorName}”</p>
      <p>To access the submission please log onto the Submission Kotahi platform at <a href="https://kotahidev.cloud68.co/login" target="_blank">https://kotahidev.cloud68.co/login</a>.</p>
      <p>If you have any questions or trouble accessing the submission, please contact the Journal Manager.</p>
      <p>Sincerely,</p>
      <p>Editor-in-Chief <br>
      Kotahi Dev
      </p>
    </p>`
  }

  result.content = result.content.replace(/\n/g, '')

  return result
}

module.exports = EditorAssignmentEmailTemplate
