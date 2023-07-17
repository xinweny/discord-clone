import { createTransport } from 'nodemailer';

import env from './env';

export const mailTransporter = createTransport({
  service: env.SMTP_SERVICE,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  }
});