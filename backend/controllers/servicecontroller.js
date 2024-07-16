// controllers/serviceController.js
import doctor from "../models/DoctorSchema.js"

import { sendNotification } from '../WebSocket.js';
// Assuming you have a Notification model
import Notification from "../models/Notification.js";


export const bookService = async (req, res) => {
  const { userid, location,roomId } = req.body;

  if (!userid || !location) {
    console.log('Missing required fields', req.body);
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Find nearest doctor
    const doctors = await doctor.find();
    const userLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    
    let nearestDoctors = [];
    let minDistance = Infinity;

    doctors.forEach(doctor => {
      const doctorLocation = {
        latitude: doctor.location.latitude,
        longitude: doctor.location.longitude,
      };
      console.log(userLocation.latitude,userLocation.longitude);
      const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, doctorLocation.latitude, doctorLocation.longitude);
      console.log(distance);
      if (distance < minDistance) {
        nearestDoctors.push(doctor);
      }
    });

    if (nearestDoctors) {

      await nearestDoctors.forEach(doctor => {
        const newNotification = new Notification({
          doctorId: doctor._id,
          message: `You have a new service request`,
          link: `/room/${roomId}`,
        });
  
        newNotification.save();
  
        // Send the notification to the nearest dealer
        sendNotification({
          type: 'NEW_SERVICE_REQUEST',
          payload: {
            doctorId: doctor._id,
            message: newNotification.message,
            link: newNotification.link
          },
        });
      });
    }
    res.status(201).send({ message: 'Service registered successfully' });
  } catch (error) {
    console.error('Error saving service:', error);
    res.status(400).json({ error: 'An error occurred while registering the service' });
  }
};

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default bookService;