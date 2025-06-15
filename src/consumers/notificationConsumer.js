const { connectRabbitMQ } = require('../infrastructure/messaging/rabbitmq');
const notificationService = require('../services/notificationService');
const { sendPushNotification } = require('../utils/sendPushNotification'); // 👈 Importação do util

async function startNotificationConsumer() {
    try {
        const channel = await connectRabbitMQ();

        channel.consume('notification', async (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                console.log(`Received message: ${messageContent}`);

                try {
                    const payload = JSON.parse(messageContent);

                    // Monta a notificação com os dados esperados + constantes
                    const notification = {
                        userId: payload.userId,
                        tipoConta: payload.tipoConta,
                        dataVencimento: payload.dataVencimento,
                        valor: payload.valor,
                        event: 'conta_a_vencer',
                        push: true
                    };

                    // Grava no banco
                    await notificationService.createNotification(notification);

                    // Dispara o push automaticamente
                    await sendPushNotification(notification.userId, {
                        title: `Conta a vencer: ${notification.tipoConta}`,
                        body: `Valor: R$ ${notification.valor} - Vence em: ${notification.dataVencimento}`
                    });

                    channel.ack(msg); // Confirma que a msg foi processada

                } catch (error) {
                    console.error('Error processing message:', error);
                    // Se der erro, não faz ack — mensagem pode ser reprocessada
                }
            }
        }, {
            noAck: false
        });

    } catch (error) {
        console.error('Failed to start notification consumer:', error);
    }
}

module.exports = { startNotificationConsumer };
