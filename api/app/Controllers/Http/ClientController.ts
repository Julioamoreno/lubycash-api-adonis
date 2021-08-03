import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kafka from 'App/Services/Kafka'


export default class ClientController {
  protected kafka = new Kafka({ groupId: 'client' })
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['full_name', 'email', 'phone', 'cpf_number', 'address', 'city', 'state', 'zipcode', 'average_salary'])

      await this.kafka.send({ topic: 'checkClientAvailable', value: JSON.stringify({ email: data.email, cpf: data.cpf_number }) });
      await this.kafka.consume({ topic: data.cpf_number.toString() })
      await this.kafka.send({ topic: 'newclient', value: JSON.stringify(data) })
      return response.json({ messagem: 'Requisição enviada com sucesso, aguarde a resposta.' })
    } catch (err) {
      return response.status(500).send(err);
    }
  }
}
