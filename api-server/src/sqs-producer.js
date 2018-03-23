const Producer = require('sqs-producer');

class SQSProducer {
  constructor() {
    this.producer = Producer.create({
      queueUrl: process.env.SQS_DEFAULT_QUEUE,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION
    });
  }

  sendMsg(message) {
    return new Promise((resolve, reject) => {
      this.producer.send({
        body: message,
        groupId: 'default'
      }, err => err ? reject(err) : resolve())
    });
  }

  queueSize() {
    return new Promise((resolve, reject) => {
      this.producer.queueSize((err, size) => err ? reject(err) : resolve(size))
    });
  }
}

module.exports = SQSProducer;