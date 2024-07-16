import express from "express";
import { login, registerUser } from "../controllers/authController.js";
import { getNotifications } from "../controllers/authController.js";
import { getNotificationVs } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get('/:userId/notifications',getNotifications);
router.get('/:userId/notificationvs',getNotificationVs);
<<<<<<< HEAD
=======
// router.patch('/notifications/:notificationId', markAsRead);
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
export default router;
