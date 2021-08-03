import User from 'App/Models/User'
import crypto from 'crypto'

export default async function NewClientController (client) {
  try {
    const { id, email } = client
    const password = crypto.randomBytes(6).toString('hex')
    let data = {
      client_id: id,
      email,
      password,
    }
    const user = await User.create(data)
    console.log(user.serialize());
  } catch (error) {
    return error
  }
}
