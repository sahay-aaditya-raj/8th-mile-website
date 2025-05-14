// lib/db.ts
import mongoose from 'mongoose';


const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    const uri = process.env.MONGODB_URI || '';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export { connectToDatabase };