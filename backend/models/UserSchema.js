import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
<<<<<<< HEAD
  Contact: {
    type: Array,
  },
=======
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
});

export default mongoose.model("User", UserSchema);
