import amqp from 'amqplib';
import logger from '../../utils/logger';

let channel: amqp.Channel | null = null;

export const connectToRabbitMQ = async () => {
  const rabbitMQUrl = process.env.RABBITMQ_URL as string;
  if (!rabbitMQUrl) {
     logger.error("RabbitMQ URL is not defined in environment variables");
  }

  try {
    const connection = await amqp.connect(rabbitMQUrl);
    logger.info("Connected to RabbitMQ");
    channel = await connection.createChannel();

  } catch (error) {
    logger.error("Failed to connect to RabbitMQ:", error);
  }

}

export const sendToQueue = async (queue: string, message: object) => {
   if(!channel) {
      logger.error("Channel is not initialized. Cannot send message to queue.");
      return;
   }
   
  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {persistent: true});
  logger.info(`Message sent to queue ${queue}:`, message);
}


export const consumeFromQueue = async (queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) => {
  if (!channel) {
    logger.error("Channel is not initialized. Cannot consume from queue.");
    return;
  }

  channel.assertQueue(queue, { durable: true });
  channel.consume(queue, callback, { noAck: false });
  logger.info(`Started consuming from queue ${queue}`);
}

export const closeConnection = async () => {
  if (channel) {
    await channel.close();
    logger.info("RabbitMQ channel closed");
  }
};

const RabbitMQProvider = {
  connectToRabbitMQ,
  sendToQueue,
  consumeFromQueue,
  closeConnection
}

export default RabbitMQProvider;