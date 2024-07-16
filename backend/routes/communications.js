import express from 'express';
import { getCommunicationHistory } from '../controllers/communicationController.js';

const router = express.Router();

router.get('/communications/:userId/:doctorId', getCommunicationHistory);

export default router;
