// lib/db.ts
import mongoose from 'mongoose';


const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    const uri = process.env.MONGODB_URI || '';
    await mongoose.connect(uri, {
      maxPoolSize: 50,  // Maximum 50 connections to prevent DB exhaustion
      minPoolSize: 10,  // Keep 10 connections warm
      serverSelectionTimeoutMS: 5000,  // Timeout after 5s if can't connect
      socketTimeoutMS: 45000,  // Close sockets after 45s of inactivity
      maxIdleTimeMS: 300000,  // Remove idle connections after 5 minutes
    });
    console.log('Connected to MongoDB with connection pooling');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;  // Propagate error instead of silently failing
  }
};

export { connectToDatabase };