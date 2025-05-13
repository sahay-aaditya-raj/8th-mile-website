import mongoose, { Schema, Document } from 'mongoose';
import { Event } from '@/types';

// Interface for the MongoDB document
export interface IEventDocument extends Document, Omit<Event, 'id'> {
  // MongoDB uses _id by default, so we'll map that to id when returning
}

const ContactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }
}, { _id: false });

const EventSchema = new Schema({
  // Using the original id field as is (not letting MongoDB generate _id)
  _id: { type: String, required: true },
  photoPath: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  prizes: { type: [String], default: [] },
  teamsize: { type: String, required: true },
  maxParticipants: { type: Number, default: 0 },
  registrationFee: { type: String, required: true },
  guidelines: { type: [String], default: [] },
  contact: { type: [ContactSchema], default: [] },
  registrationDeadline: { type: String, default: '' },
  currentRegistrations: { type: Number, default: 0 },
  registrationOpen: { type: Boolean, default: false }
});



// Check if model exists before creating to avoid overwrite in Next.js hot reloading
export const EventModel = mongoose.models.Event || 
  mongoose.model<IEventDocument>('Event', EventSchema);