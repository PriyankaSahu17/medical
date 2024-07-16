// models/Notification.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationSchemaV = new Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true },
  message: { type: String },
  name:{type: String},
  phone:{type:String},
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  link:{type:String, rquired:true}
});

export default mongoose.model("NotificationV", notificationSchemaV);

