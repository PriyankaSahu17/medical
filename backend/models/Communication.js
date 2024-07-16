import mongoose from 'mongoose';

const CommunicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  messages: [{
    senderId: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderType' },
    senderType: { type: String, enum: ['User', 'Doctor'] },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Communication', CommunicationSchema);
