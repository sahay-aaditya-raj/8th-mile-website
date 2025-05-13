// lib/models/Payment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  _id: string; // Using Razorpay Payment ID as MongoDB _id
  orderId: string; // Razorpay Order ID
  signature: string;
  name: string; // Team leader name for team events
  email: string; // Team leader email
  phone?: string; // Team leader phone
  amount: number;
  passId: string;
  noOfParticipants: number; // 1 for individual, >1 for teams
  participantsName: string[]; // Array of participant names
  participantsStatus: boolean[]; // Check-in status for each participant
  basePrice?: number;
  gstAmount?: number;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  _id: { type: String }, // Using Razorpay Payment ID as MongoDB _id
  orderId: { type: String, required: true },
  signature: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  amount: { type: Number, required: true },
  passId: { type: String, required: true },
  noOfParticipants: { type: Number, default: 1 },
  participantsName: { type: [String], default: [] },
  participantsStatus: { type: [Boolean], default: [] },
  basePrice: { type: Number },
  gstAmount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// Check if the model is already defined to prevent OverwriteModelError
export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);