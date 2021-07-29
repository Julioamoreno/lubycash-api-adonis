import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TypeTransaction from 'App/Models/TypeTransaction'

export default class PixTypeTransactionSeeder extends BaseSeeder {
  public async run () {
    await TypeTransaction.create({
      name: 'pix'
    })
  }
}
