import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://priyankasahu9350:lE7XC64NsmWAYx8V@doctor-final.lni1gul.mongodb.net/?retryWrites=true&w=majority&appName=doctor-final';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
