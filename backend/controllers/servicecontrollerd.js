// controllers/serviceController.js
import doctor from "../models/DoctorSchema.js";
import { sendNotification } from '../WebSocket.js';
import Notification from "../models/Notification.js";

export const findDoctor = async (req, res) => {
  const { userid, name, phone, message,roomId } = req.body;

  if (!userid || !name || !phone || !roomId) {
    console.log('Missing required fields', req.body);
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Find all doctors with status true
    const doctors = await doctor.find({ status: true });

    if (doctors.length > 0) {
      await Promise.all(
        doctors.map(async doctor => {
          const newNotification = new Notification({
            doctorId: doctor._id,
            message: `${message}`,
            name: name,
            phone:phone,
            link: `/room/${roomId}`,
          });

          await newNotification.save();

          // Send the notification to the doctor
          sendNotification({
            type: 'NEW_SERVICE_REQUEST',
            payload: {
              doctorId: doctor._id,
              message: newNotification.message,
              link: newNotification.link,
            },
          });
        })
      );
    }

    res.status(201).send({ message: 'Service registered successfully' });
  } catch (error) {
    console.error('Error saving service:', error);
    res.status(400).json({ error: 'An error occurred while registering the service' });
  }
};

export default findDoctor;
