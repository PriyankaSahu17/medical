import express from 'express';
import { sendNotification,markAsRead,deleteNotification} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/send-notification', sendNotification);
router.put('/notifications/:id/read', markAsRead);
router.delete('/notifications/:id', deleteNotification);

export default router;
