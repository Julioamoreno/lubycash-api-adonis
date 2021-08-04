import Env from '@ioc:Adonis/Core/Env'
import { MailConfig } from '@ioc:Adonis/Addons/Mail'

const mailConfig: MailConfig = {
  mailer: 'smtp',
  mailers: {

    smtp: {
      driver: 'smtp',
      port: 2525,
      host: 'smtp.mailtrap.io',
      auth: {
        type: 'login',
        user: Env.get('SMTP_USERNAME'),
        pass: Env.get('SMTP_PASSWORD'),
      },
    },

  },
}

export default mailConfig
