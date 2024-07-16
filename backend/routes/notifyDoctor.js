const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');

router.post('/notify-doctor', authenticate, async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find an available doctor (customize this logic as needed)
    const doctor = await Doctor.findById('668682f283c9ae327f672180');
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not available' });
    }

    // Create a notification
    const notification = new Notification({
      userId: user._id,
      doctorId: doctor._id,
      message: `User ${user.name} needs assistance`,
    });
    await notification.save();

    // Send a notification (e.g., email, push notification, etc.)
    // Implement your notification sending logic here...

    res.status(200).json({ message: 'Notification sent to the doctor' });
  } catch (error) {
    console.error('Error sending notification', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
