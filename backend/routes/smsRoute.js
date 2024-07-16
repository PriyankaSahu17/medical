// routes/smsRoute.js
import express from 'express';
import { sendSms } from '../controllers/smsController.js';

const router = express.Router();

router.post('/send-sms', sendSms);

export default router;
