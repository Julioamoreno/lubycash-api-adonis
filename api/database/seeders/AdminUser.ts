import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create(
      {
        client_id: 0,
        email: 'admin@admin.com',
        password: 'admin123',
        is_admin: true,
      },
    )
  }
}
