import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeTransaction from 'App/Models/TypeTransaction'

export default class TypeTransactionsController {
    public async index({ response }: HttpContextContract) {
    const typeTransaction = await TypeTransaction.all()
    return response.json(typeTransaction)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['name'])
    const typeTransaction = await TypeTransaction.create(data)
    return typeTransaction
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const typeTransaction = await TypeTransaction.findOrFail(id)
    return response.json(typeTransaction)
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['name'])
    const typeTransaction = await TypeTransaction.findOrFail(id)
    typeTransaction.merge(data)
    await typeTransaction.save()
    return typeTransaction

  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    const typeTransaction = await TypeTransaction.findOrFail(id)
    await typeTransaction.delete()
    return typeTransaction
}
