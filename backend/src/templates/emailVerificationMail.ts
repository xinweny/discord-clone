export const emailVerificationMail = (username: string, link: string) => (`
  <h2>Hey ${username},</h2>
  <br>
  <h1>Welcome to Discord Clone!</h1>
  <br>
  <p>Please click on the link below to verify your email address:</p>
  <a href="${link}"><strong>Verify Email</strong></a>
  <br>
  <p>Please note that this link will expire in <strong>30 minutes.</strong></p>
  <br>
  <p>Thank you,<p>
  <p>Discord Clone</p>
`);