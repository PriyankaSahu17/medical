import mongoose from "mongoose";
import { Decimal128 } from "mongodb";
const VolunteerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },
  address: { type: String  },
        city: { type: String },
        state: { type: String},
        country: { type: String},
        pincode: { type: String },

  // Fields for doctors only
  isMedicalProfessional: { type: Boolean },
  qualifications: {
    type: Array,
  },
  isMedicalProfessional: {
    type: Boolean
    
},
profession: {
    type: String,
    //required: function() { return this.professionalInfo.isMedicalProfessional; } // Only required if isMedicalProfessional is true
},
medicalDegreeCertificationUrl: {
    type: String,
    //required: function() { return this.professionalInfo.isMedicalProfessional; } // Only required if isMedicalProfessional is true
},
hasCertification: {
    type: Boolean
},
certificationUrl: {
    type: String,
    //required: function() { return this.professionalInfo.hasCertification; } // Only required if hasCertification is true
},
  experiences: {
    type: Array,
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Not Available']
},
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  status:{
    type: Boolean,
    default: "true"
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  
  location: {
    latitude: {
        type: Decimal128,
        
    },
    longitude: {
        type: Decimal128,
        
    }
  },
});

export default mongoose.model("Volunteer", VolunteerSchema);
