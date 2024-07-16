import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import Volunteer from "../models/VolunteerSchema.js";
import notificationSchema from "../models/Notification.js"
import Notificationv from "../models/Notificationv.js";

// generate token
const generateToken = user => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

export const registerUser = async (req, res) => {
  const { name, email, password, role, photo, gender } = req.body;

  try {
    // Check if user already exists
    let user = null;

    // const patient = await User.findOne({ email });
    // const doctor = await Doctor.findOne({ email });
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }
    else if (role === "Volunteer") {
      user = await Volunteer.findOne({ email });
    }
    
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create and save user based on the role
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "volunteer") {
      user = new Volunteer({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "user successfully created1" });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ success: false, message: "Internal server error! Try again" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;

    // Check the user's role and retrieve from the appropriate collection
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const volunteer = await Volunteer.findOne({email});

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }
    else if (volunteer) {
      user = volunteer;
    }
    // Check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const { password, role, appointments, ...rest } = user._doc;

    // get token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
export const getNotifications =async(req,res) =>{
  try {
    const { userId } = req.params;
    const Usernotifications = await notificationSchema.find({ doctorId: userId });
    console.log(userId, Usernotifications)
    console.log(req.params);
    res.status(200).json(Usernotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
}
export const getNotificationVs =async(req,res) =>{
  try {
    const { userId } = req.params;
    const Usernotifications = await Notificationv.find({ volunteerId: userId });
    console.log(userId, Usernotifications)
    console.log(req.params);
    res.status(200).json(Usernotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
}
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await UserNotification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};