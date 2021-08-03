import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthenticationController.store')
Route.post('client/new', 'ClientController.store')
Route.post('logout', 'AuthenticationController.destroy')
Route.resource('password', 'ForgotPasswordsController').only(['store', 'update'])

Route.resource('transaction', 'TransactionsController').apiOnly()
Route.group(() => {
  Route.resource('user', 'UsersController').apiOnly()
  Route.resource('typetransaction', 'TypeTransactionsController').apiOnly()
  Route.resource('client/logs', 'ClientLogsController').apiOnly()
}).middleware(['auth','admin']);
