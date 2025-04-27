// lib/models/Payment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  _id: string; // Razorpay Payment ID as custom _id
  orderId: string; // Razorpay Order ID
  signature: string;
  name: string;
  email: string;
  phone?: string;
  amount: number;
  passId: string;
  basePrice: number;
  gstAmount: number;
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
  basePrice: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Check if the model is already defined to prevent OverwriteModelError
export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);