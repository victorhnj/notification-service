const { db, admin } = require('../firebase-admin');

async function addNotification(notificationData) {
  const docRef = await db.collection('notifications').add({
    ...notificationData,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    scheduledFor: notificationData.scheduledFor
      ? admin.firestore.Timestamp.fromDate(new Date(notificationData.scheduledFor))
      : null,
    read: false
  });
  return docRef;
}

async function getNotificationsByUser(userId) {
  const snapshot = await db
    .collection('notifications')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function markNotificationAsRead(notificationId) {
  await db.collection('notifications').doc(notificationId).update({ read: true });
}

module.exports = {
  addNotification,
  getNotificationsByUser,
  markNotificationAsRead
};
