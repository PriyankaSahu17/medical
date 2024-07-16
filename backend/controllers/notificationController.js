import Notification from '../models/Notification.js';
import Communication from '../models/Communication.js';

export const sendNotification = async (req, res) => {
  try {
    const { userId, doctorId, message, location } = req.body;
    const notification = new Notification({
      senderId: userId,
      receiverId: doctorId,
      message,
      location
    });

    await notification.save();

    // Add communication record
    let communication = await Communication.findOne({ userId, doctorId });
    if (!communication) {
      communication = new Communication({ userId, doctorId, messages: [] });
    }

    communication.messages.push({
      senderId: userId,
      senderType: 'User',
      message
    });

    await communication.save();

    res.status(200).send({ success: true, notification });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!notification) {
      return res.status(404).send({ success: false, message: 'Notification not found' });
    }

    res.status(200).send({ success: true, notification });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).send({ success: false, message: 'Notification not found' });
    }

    res.status(200).send({ success: true, message: 'Notification deleted' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
