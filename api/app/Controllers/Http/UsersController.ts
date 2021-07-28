import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.json(users)
  }

  public async store({ request }: HttpContextContract) {
    try {
      const data = request.only(['client_id', 'email', 'password', 'is_admin'])
      console.log(data)
      const user = await User.create(data)
      return user
    } catch (error) {
      return error
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.findOrFail(id)
    return response.json(user)
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['client_id', 'email', 'password', 'is_admin'])
    const user = await User.findOrFail(id)
    user.merge(data)
    return response.json(user)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.findOrFail(id)
    await user.delete()
    return response.json(user)
  }
}
