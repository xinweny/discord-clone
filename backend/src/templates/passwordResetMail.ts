export const passwordResetMail = (username: string, link: string) => (`
  <h2>Hey ${username},</h2>
  <br>
  <h1>Forgot your password?</h1>
  <br>
  <p>Your Discord password can be reset by clicking the link below. If you did not request a new password, please ignore this email.</p>
  <a href="${link}"><strong>Reset Password</strong></a>
  <br>
  <p>Please note that this link will expire in <strong>30 minutes.</strong></p>
  <br>
  <p>Thank you,<p>
  <p>Discord Clone</p>
`);