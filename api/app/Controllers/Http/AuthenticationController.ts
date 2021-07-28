import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const { token } = await auth.attempt(email, password)
      const user = await (await User.findByOrFail("email", email)).serialize()
      return { ...user, token }
    } catch (err) {
      return response.badRequest('Invalid credentials')
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }
}
