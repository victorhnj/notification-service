const { db, admin } = require('../firebase-admin');

/**
 * Adiciona uma nova notificação para o usuário.
 * Salva no Firestore na coleção 'notifications'.
 */
async function addNotification(notificationData) {
  const docRef = await db.collection('notifications').add({
    ...notificationData,
    createdAt: admin.firestore.FieldValue.serverTimestamp(), // timestamp de criação
    scheduledFor: notificationData.scheduledFor
      ? admin.firestore.Timestamp.fromDate(new Date(notificationData.scheduledFor))
      : null,
    read: false // notificação começa como não lida
  });
  return docRef;
}

/**
 * Retorna todas as notificações de um usuário, ordenadas da mais recente para a mais antiga.
 */
async function getNotificationsByUser(userId) {
  const snapshot = await db
    .collection('notifications')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Marca uma notificação como lida.
 */
async function markNotificationAsRead(notificationId) {
  await db.collection('notifications').doc(notificationId).update({ read: true });
}

module.exports = {
  addNotification,
  getNotificationsByUser,
  markNotificationAsRead
};
