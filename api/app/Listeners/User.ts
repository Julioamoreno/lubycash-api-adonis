import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import ModelUser from 'App/Models/User'
import crypto from 'crypto'

export default class User {
  protected generatePassWord() {
    return crypto.randomBytes(6).toString('hex')
  }

  public async onNewUser(dataUser: EventsList['new:user']) {
    try {
      const { id, email } = dataUser
      const password = this.generatePassWord()
      let data = {
        client_id: id,
        email,
        password,
      }
      Event.emit('sendWelcomeMail', data)
      const user = await ModelUser.create(data)

      console.log(user.serialize());
    } catch (error) {
      return error
    }
  }
}
