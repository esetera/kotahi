const SubmissionConfirmationEmailTemplate = ({
  articleTitle,
  link,
  receiverFirstName,
}) => {
  const result = {
    cc: '',
    subject: 'Kotahi Notification Email',
    content: '',
  }

  switch (process.env.INSTANCE_NAME) {
    case 'aperture':
      result.cc = 'aperture@humanbrainmapping.org'
      result.subject = 'Aperture Neuro – Received Research Object Submission'
      result.content = `<p>
      <b>Dear ${receiverFirstName},</b>
      <br>
      <br>
      <p>Thank you for your submission.</p>
      <p>Research Object Title: "${articleTitle}"</p>
      <p>We have successfully received your Research Object, and it is currently under review. You can check the status of your submission at any time by logging into the publishing platform and navigating to your dashboard.</p>
      <p>The Journal Manager will be in touch with you with any questions should they arise. If you have any questions, please contact Kay Vanda, the Aperture Neuro Journal Manager, at aperture@humanbrainmapping.org.</p>
      <br>
      <p>
      Thank you, <br><br>
      Kay Vanda <br>
      Journal Manager <br>
      Aperture Neuro
      </p>
    </p>`
      break
    default:
      result.subject = 'Received Research Object Submission'
      result.content = `<p>
      <b>Dear ${receiverFirstName},</b>
      <br>
      <br>
      <p>Thank you for your submission.</p>
      <br>
      <p>Research Object Title: ${articleTitle}</p>
      <br>
      <p>We have successfully received your Research Object, and it is currently under review. You can check the status of your submission at any time by logging into the publishing platform and navigating to your dashboard.</p>
      <p>The Journal Manager will be in touch with you with any questions should they arise.</p>
      <p>
      Thank you, 
      <br>
      <br>
      Kotahi Dev
      </p>
    </p>`
  }

  result.content = result.content.replace(/\n/g, '')

  return result
}

module.exports = SubmissionConfirmationEmailTemplate
