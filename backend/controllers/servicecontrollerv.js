// // controllers/serviceController.js
// //import doctor from "../models/DoctorSchema.js";
// import volunteer from "../models/VolunteerSchema.js";

// import { sendNotification } from '../WebSocket.js';
// import Notification from "../models/Notification.js";

// export const bookServicev = async (req, res) => {
//   const { userid, name, phone, message,location } = req.body;

//   if (!userid || !name || !phone) {
//     console.log('Missing required fields', req.body);
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     // Find all doctors with status true
//     const volunteers = await volunteer.find({
//       availabilityStatus: 'Available',
//       isApproved: 'approved'
//     });
//     console.log(message);
//     if (volunteers.length > 0) {
//       await Promise.all(
//         volunteers.map(async volunteer => {
//           const newNotification = new Notification({
//             doctorId: volunteer._id,
//             message: `a new service request from ${name} (Phone: ${phone}). Message: ${message}`,
//             name: name,
//             link: `dealer/service`,
//           });

//           await newNotification.save();

//           // Send the notification to the doctor
//           sendNotification({
//             type: 'NEW_SERVICE_REQUEST',
//             payload: {
//               doctorId: volunteer._id,
//               message: newNotification.message,
//               link: `/`,
//             },
//           });
//         })
//       );
//     }

//     res.status(201).send({ message: 'Service registered successfully' });
//   } catch (error) {
//     console.error('Error saving service:', error);
//     res.status(400).json({ error: 'An error occurred while registering the service' });
//   }
// };

// export default bookServicev;
// controllers/serviceController.js
import volunteer from "../models/VolunteerSchema.js";
import { sendNotification } from '../WebSocket.js';
import Notification from "../models/Notificationv.js";

export const findVolunteer = async (req, res) => {
  const { userid, name, phone, message, location } = req.body;

  // Extract latitude and longitude from location object
  const { latitude, longitude } = location;

  if (!userid || !name || !phone || !latitude || !longitude) {
    console.log('Missing required fields', req.body);
    return res.status(400).json({ error: 'All fields including latitude and longitude are required' });
  }
  
  try {
    // Find all volunteers with availabilityStatus: 'Available' and isApproved: 'approved'
    const volunteers = await volunteer.find({
      availabilityStatus: 'Available',
      isApproved: 'approved'
    });

    if (volunteers.length > 0) {
      await Promise.all(
        volunteers.map(async volunteer => {
          const newNotification = new Notification({
            volunteerId: volunteer._id,
            message: `${message}`,
            name: name,
            phone:phone,
            link: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
          });

          await newNotification.save();

          // Send the notification to the volunteer
          sendNotification({
            type: 'NEW_SERVICE_REQUEST',
            payload: {
              volunteerId: volunteer._id,
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

export default findVolunteer;
