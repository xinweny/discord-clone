import { env, mailTransporter } from '@config';

const sendMail = async (to: string, subject: string, htmlTemplate: string) => {
  const mailOptions = {
    from: {
      name: 'Discord Clone',
      address: env.SMTP_EMAIL,
    },
    to,
    subject,
    html: htmlTemplate,
  };

  await mailTransporter.sendMail(mailOptions);

  return mailOptions;
}

export const mailService = {
  sendMail,
}