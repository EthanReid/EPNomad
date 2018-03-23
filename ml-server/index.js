const Consumer = require('sqs-consumer');
let onDeathRequest = require('death')({ uncaughtException: true });

const trainQueueUrl = 'https://sqs.us-east-1.amazonaws.com/505123304107/TrainQueue.fifo';

async function train() {
  ;
}

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/505123304107/TrainQueue.fifo',
  region: 'us-east-1',
  handleMessage: (message, done) => {
    let request = JSON.parse(message);
    let { action } = request;
    switch (action) {
      case "train":
        break;
      case "infer":
        break;
      default:
        // not sure how to handle this action
        done("Unknown action specified: " + action);
        break;
    }
  }
});

app.on('error', err => {
  console.log(err.message);
});

onDeathRequest((signal, err) => {
  switch (signal) {
    case "SIGINT":
    case "SIGQUIT":
    case "SIGTERM":
      console.error("A request to terminated has been detected! Stopping the queue listener...")
      app.stop();
      break;
    case "uncaughtException":
      console.error("An uncaught exception has occurred! Stopping the queue listener...")
      app.stop();
      break;
    default:
      console.error(`Unknown signal detected: ${signal}. Ignoring it!`)
      break;
  }
});

app.start();