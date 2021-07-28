import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id_sender').notNullable()
      table.integer('client_id_recipient').notNullable()
      table.integer('type_transaction_id').unsigned().references('id').inTable('type_transactions').onDelete('CASCADE')
      table.double('value').notNullable()
      table.string('description', 140)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
