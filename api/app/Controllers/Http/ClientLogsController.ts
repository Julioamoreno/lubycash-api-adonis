import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientLog from 'App/Models/ClientLog'

export default class ClientLogsController {
  public async index({ response }: HttpContextContract) {
    const clientLog = await ClientLog.all()
    return response.json(clientLog)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['client_id', 'status'])
    const clientLog = await ClientLog.create(data)
    return clientLog
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const clientLog = await ClientLog.findOrFail(id)
    return response.json(clientLog)
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['client_id', 'status'])
    const clientLog = await ClientLog.findOrFail(id)
    clientLog.merge(data)
    await clientLog.save()
    return clientLog

  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    const clientLog = await ClientLog.findOrFail(id)
    await clientLog.delete()
    return clientLog
  }
}
