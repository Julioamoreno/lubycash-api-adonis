import CreateUser from '../Controllers/local/UserController';
import { Kafka, Consumer, Producer, Admin, Message } from 'kafkajs';
import Event from '@ioc:Adonis/Core/Event'

interface Topic {
  topic: string | RegExp;
}

interface ConsumerConfig {
  groupId: string;
}

interface SendParams {
  topic: string;
  value: Message["value"];
}

interface CheckClientAvailableType {
  email: string;
  cpf_number: number;
}

export default class KafkaService {
  public consumer: Consumer;
  public producer: Producer;
  public admin: Admin;

  constructor({ groupId }: ConsumerConfig) {
    const kafka = new Kafka({
        brokers: ['kafkaservice:9092']
    });
    this.producer = kafka.producer()
    this.consumer = kafka.consumer({ groupId })
    this.admin = kafka.admin()
  }

  async consumeApproved() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'client_approved', fromBeginning: false });

    await this.consumer.run({
        eachMessage: async ({ message }) => {
          const messageJson = JSON.parse(message.value!.toString());
          Event.emit('new:user', messageJson)
        }
    })
  }

  async consume({ topic }: Topic) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
        eachMessage: async ({ message }) => {
          const messageJson: CheckClientAvailableType = await JSON.parse(message.value!.toString());
          console.log(messageJson);
          if (messageJson.cpf_number) throw new Error('Usuário já existe');
        }

    })
  }

  async send({ topic, value }: SendParams) {
    await this.producer.connect();
    await this.producer.send({
        topic,
        messages: [
            {
              value,
            }

        ]
      });
      await this.producer.disconnect();
  }
}
