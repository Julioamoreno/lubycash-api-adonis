import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthenticationController.store')
Route.post('logout', 'AuthenticationController.destroy')

Route.resource('user', 'UsersController').apiOnly()
Route.resource('typetransaction', 'TypeTransactionsController').apiOnly()
Route.resource('transaction', 'TransactionsController').apiOnly()
Route.resource('client/logs', 'ClientLogsController').apiOnly()
