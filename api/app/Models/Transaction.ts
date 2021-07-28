import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TypeTransaction from './TypeTransaction'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id_sender: number

  @column()
  public client_id_recipient: number

  @column()
  public type_transaction_id: number

  @column()
  public value: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => TypeTransaction, {
    localKey: 'type_transaction_id',
  })
  public type: HasOne<typeof TypeTransaction>
}
