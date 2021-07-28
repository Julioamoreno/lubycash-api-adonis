import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').notNullable()
      table.string('email', 140).notNullable().unique()
      table.string('password', 140).notNullable()
      table.string('password_token', 180)
      table.dateTime('password_token_expiration')
      table.boolean('is_admin').defaultTo(false)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
