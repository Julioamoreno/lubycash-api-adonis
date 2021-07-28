import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClientLogs extends BaseSchema {
  protected tableName = 'client_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').notNullable()
      table.enu('status', ['pending', 'approved', 'disapproved']).defaultTo('pending')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
