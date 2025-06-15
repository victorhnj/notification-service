const notificationRepository = require('../repositories/notificationRepository');
const tokenRepository = require('../repositories/tokenRepository');
const { admin } = require('../firebase-admin');

async function createNotification(notificationData) {
  const docRef = await notificationRepository.addNotification(notificationData);

  // Sempre tenta enviar push se houver userId
  if (notificationData.userId) {
    const userToken = await tokenRepository.getTokenByUserId(notificationData.userId);

    if (!userToken) {
      console.warn(`Nenhum token FCM encontrado para userId: ${notificationData.userId}`);
    } else {
      const messageFCM = {
        token: userToken,
        notification: {
          title: notificationData.title,
          body: notificationData.message,
        },
        android: {
          priority: 'high',
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
            },
          },
        },
      };

      try {
        const response = await admin.messaging().send(messageFCM);
        console.log('Push notification sent:', response);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
  }

  return docRef;
}

async function getNotificationsByUser(userId) {
  return await notificationRepository.getNotificationsByUser(userId);
}

async function markNotificationAsRead(notificationId) {
  await notificationRepository.markNotificationAsRead(notificationId);
}

module.exports = {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
};
