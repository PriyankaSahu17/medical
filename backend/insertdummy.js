import mongoose from 'mongoose';
import Doctor from './models/DoctorSchema.js';

// Replace with your MongoDB Atlas connection string
const mongoURI ='mongodb+srv://priyankasahu9350:lE7XC64NsmWAYx8V@doctor-final.lni1gul.mongodb.net/?retryWrites=true&w=majority&appName=doctor-final';
// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Generate dummy data
const dummyDoctors = [];
for (let i = 0; i < 10; i++) {
  dummyDoctors.push({
    email: `doctor${i}@example.com`,
    password: `password${i}`,
    name: `Doctor ${i}`,
    phone: 1234567890 + i,
    photo: `https://example.com/photos/doctor${i}.jpg`,
    ticketPrice: 100 + i * 10,
    role: 'doctor',
    specialization: `Specialization ${i}`,
    qualifications: [`Qualification ${i}`, `Qualification ${i + 1}`],
    experiences: [`Experience ${i}`, `Experience ${i + 1}`],
    bio: `This is bio of Doctor ${i}`,
    about: `This is about Doctor ${i}`,
    timeSlots: [`Slot ${i}`, `Slot ${i + 1}`],
    reviews: [],
    averageRating: 0,
    totalRating: 0,
    isApproved: 'pending',
  });
}

// Insert dummy data into the database
Doctor.insertMany(dummyDoctors)
  .then((docs) => {
    console.log('Dummy doctors inserted:', docs);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting dummy doctors:', err);
    mongoose.connection.close();
  });
