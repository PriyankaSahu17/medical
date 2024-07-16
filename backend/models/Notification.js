// models/Notification.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  message: { type: String },
  name:{type: String},
  phone:{type: String},
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  link:{type:String, rquired:true}
});

export default mongoose.model("Notification", notificationSchema);

