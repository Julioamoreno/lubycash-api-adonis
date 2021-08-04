import Event from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'

Event.on('sendWelcomeMail', async (data) => {
  const { email, password } = data;
  return await Mail.send((message) => {
      message
        .from('admin@lubycash.com')
        .to(email)
        .subject('Bem vindo')
        .htmlView('emails/welcome', { email, password })
  })
})

Event.on('new:user', 'User.onNewUser')
