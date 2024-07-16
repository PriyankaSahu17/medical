import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
<<<<<<< HEAD
import smsRoute from './routes/smsRoute.js';
=======

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import bookRoute from "./routes/Servicerouter.js"
import volunteerRoute from "./routes/volunteer.js";
<<<<<<< HEAD
=======
//import Notifydoctor from "./routes/notifyDoctor.js";
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("hello server");
});

<<<<<<< HEAD
=======
// database connection
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD
app.use('/api/v1/sms', smsRoute);
=======

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/volunteers",volunteerRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/bookit", bookRoute);
<<<<<<< HEAD
=======
//app.use("/api/v1/notifydoctors", Notifydoctor);
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
app.listen(port, () => {
  connectDB();
  console.log("server listening on port" + port);
});
