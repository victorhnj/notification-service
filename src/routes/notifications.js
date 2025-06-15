const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const notificationController = require('../controllers/notificationController');

// router.use(authMiddleware); 

router.post('/', notificationController.createNotification);
router.get('/:userId', notificationController.getNotificationsByUser);
router.patch('/:id/mark-as-read', notificationController.markNotificationAsRead);

module.exports = router;
