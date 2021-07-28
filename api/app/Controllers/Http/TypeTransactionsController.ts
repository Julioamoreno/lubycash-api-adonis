import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeTransaction from 'App/Models/TypeTransaction'

export default class TypeTransactionsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({ }: HttpContextContract) {

  }

  public async store ({request}: HttpContextContract) {
    const data = request.only(['name'])
    const typeTransaction = await TypeTransaction.create(data)
    return typeTransaction
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
