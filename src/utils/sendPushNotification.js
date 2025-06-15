const fetch = require('node-fetch');

async function sendPushNotification(token, notificationData) {
    const serverKey = process.env.FCM_SERVER_KEY;

    const message = {
        to: token,
        notification: {
            title: `Conta: ${notificationData.tipoConta}`,
            body: `Vence em ${notificationData.dataVencimento} - R$ ${notificationData.valor}`,
        },
        data: {
            userId: notificationData.userId,
            tipoConta: notificationData.tipoConta,
            dataVencimento: notificationData.dataVencimento,
            valor: notificationData.valor.toString(),
        },
    };

    await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Authorization': `key=${serverKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

module.exports = { sendPushNotification };
