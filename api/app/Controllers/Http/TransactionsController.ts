import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'

export default class TransactionsController {
    public async index({ response }: HttpContextContract) {
    const transaction = await Transaction.all()
    return response.json(transaction)
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['client_id_sender', 'client_id_recipient', 'type_transaction_id', 'value', 'description'])
    const transaction = await Transaction.create(data)
    return transaction
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const transaction = await Transaction.findOrFail(id)
    return response.json(transaction)
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['description'])
    const transaction = await Transaction.findOrFail(id)
    transaction.merge(data)
    await transaction.save()
    return transaction

  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    const transaction = await Transaction.findOrFail(id)
    await transaction.delete()
    return transaction
}
