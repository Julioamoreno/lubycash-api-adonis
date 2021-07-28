import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto'
import { DateTime } from 'luxon'
import User from 'App/Models/User'


export default class ForgetPasswordController {
  public async store({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const link = request.input('link')

    const user = await User.findByOrFail('email', email)
    user.password_token = crypto.randomBytes(10).toString('hex')
    user.password_token_expiration = DateTime.now().plus({ days: 2 })
    await user.save()
    response.send({ message: 'Uma mensagem foi enviada para o email cadastrado' })
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { token, password } = request.all()
      const id: number = request.param('id')
      const user = await User.findByOrFail('password_token', token)
      const tokenExpired = user.password_token_expiration?.startOf('day')! <= DateTime.now()

      if (user.id != id) {
        throw new Error('Invalid token')
      }
      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação está expirado ' } })
      }

      user.password_token = null
      user.password_token_expiration = null
      user.password = password

      await user.save()
      response.send({ message: 'Senha alterada com sucesso' })
    } catch (err) {
      throw new Error(err)
    }
  }
}
