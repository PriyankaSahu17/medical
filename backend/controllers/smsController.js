// controllers/smsController.js
import SmsModel from '../models/smsModel.js';
import client from '../config/twilio.js';

export const sendSms = (req, res) => {
  const { phoneNumber, message } = req.body;
  const sms = new SmsModel(phoneNumber, message);

  client.messages
    .create({
      body: sms.message,
      from: '+15595512575',
      to: sms.phoneNumber,
    })
    .then((message) => {
      res.status(200).send(`Message sent successfully with SID: ${message.sid}`);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Failed to send message');
    });
};
