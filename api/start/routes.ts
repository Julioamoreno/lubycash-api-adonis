import Route from '@ioc:Adonis/Core/Route'

Route.resource('user', 'UsersController').apiOnly()
Route.resource('typetransaction', 'TypeTransactionsController').apiOnly()
