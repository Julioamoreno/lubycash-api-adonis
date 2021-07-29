import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

export default class Admin {
  protected async checkIsAdmin( admin ) {
    if (admin) return true;

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
    )
  }

  public async handle ({ auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    console.log(auth.user)
    await this.checkIsAdmin(auth.user!.is_admin)

    await next()
  }
}
