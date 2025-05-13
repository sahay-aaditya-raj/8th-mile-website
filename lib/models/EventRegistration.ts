import mongoose, { Schema, Document } from 'mongoose';

export interface IEventRegistration extends Document {
  _id: string; // Using Razorpay Payment ID as MongoDB _id
  orderId: string;
  signature: string;
  name: string;
  email: string;
  phone?: string;
  eventId: string;
  teamSize: number;
  teamMembers: string[];
  createdAt: Date;
}

const EventRegistrationSchema: Schema = new Schema({
  _id: { type: String },
  orderId: { type: String, required: true },
  signature: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  eventId: { type: String, required: true },
  teamSize: { type: Number, default: 1 },
  teamMembers: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

// Check if the model is already defined to prevent OverwriteModelError
export const EventRegistration = mongoose.models.EventRegistration || 
  mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);