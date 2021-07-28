import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypeTransactions extends BaseSchema {
  protected tableName = 'type_transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 80).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
