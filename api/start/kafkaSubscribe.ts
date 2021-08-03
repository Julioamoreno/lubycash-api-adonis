/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import KafkaService from "App/Services/Kafka";

(async () => {
  const kafka = new KafkaService({ groupId: 'newuser' })
  await kafka.consumeApproved()
})()
