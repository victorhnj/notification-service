const notificationService = require('../services/notificationService');
const { validateCreateNotificationDto } = require('../dtos/createNotificationDto');

async function createNotification(req, res, next) {
  try {
    const validatedData = validateCreateNotificationDto(req.body);
    const notification = await notificationService.createNotification(validatedData);
    res.status(201).json({ success: true, id: notification.id });
  } catch (err) {
    next(err);
  }
}

async function getNotificationsByUser(req, res, next) {
  try {
    const notifications = await notificationService.getNotificationsByUser(req.params.userId);
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
}

async function markNotificationAsRead(req, res, next) {
  try {
    await notificationService.markNotificationAsRead(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead
};
