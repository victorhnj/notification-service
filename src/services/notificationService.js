const notificationRepository = require('../repositories/notificationRepository');
const { admin } = require('../firebase-admin');

async function createNotification(notificationData) {
  const docRef = await notificationRepository.addNotification(notificationData);

  if (notificationData.sendPush && notificationData.pushToken) {
    const messageFCM = {
      token: notificationData.pushToken,
      notification: {
        title: notificationData.title,
        body: notificationData.message
      },
      android: {
        priority: 'high'
      },
      apns: {
        payload: {
          aps: {
            sound: 'default'
          }
        }
      }
    };

    try {
      const response = await admin.messaging().send(messageFCM);
      console.log('Push notification sent:', response);
    } catch (error) {
      console.error('Error sending push notification:', error);
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
  markNotificationAsRead
};
