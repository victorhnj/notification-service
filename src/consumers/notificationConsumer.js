
const { connectRabbitMQ } = require('../infrastructure/messaging/rabbitmq');
const notificationService = require('../services/notificationService');
const notificationTemplates = require('../templates/notificationTemplates');

async function startNotificationConsumer() {
    const channel = await connectRabbitMQ();

    console.log('🟢 Aguardando mensagens na fila "notification"...');

    channel.consume('notification', async (msg) => {
        if (msg !== null) {
            const content = msg.content.toString();
            console.log(`📥 Mensagem recebida: ${content}`);

            try {
                const eventData = JSON.parse(content);

                const templateFunc = notificationTemplates[eventData.event];
                if (!templateFunc) {
                    console.warn(`⚠️ Template não encontrado para evento: ${eventData.event}`);
                    channel.ack(msg);
                    return;
                }

                const { title, message } = templateFunc(eventData);

                await notificationService.createNotification({
                    userId: eventData.userId,
                    title,
                    message,
                    type: eventData.event,
                    scheduledFor: null,
                    sendEmail: eventData.sendEmail || false,
                    sendPush: eventData.sendPush || false,
                    pushToken: eventData.pushToken || null
                });

                console.log(`✅ Notificação gerada para userId=${eventData.userId}`);

                channel.ack(msg);
            } catch (error) {
                console.error(`❌ Erro ao processar mensagem:`, error);
                channel.nack(msg);
            }
        }
    }, { noAck: false });
}

module.exports = { startNotificationConsumer };
