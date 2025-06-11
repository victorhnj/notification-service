
const amqp = require('amqplib');

async function connectRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('notification', { durable: true });
    return channel;
}

module.exports = { connectRabbitMQ };
