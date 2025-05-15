import mongoose from 'mongoose';

// Define contact schema for event organizers/coordinators
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, { timestamps: false });

// Main event schema
const eventSchema = new mongoose.Schema({
  _id: String, // Event ID/code like "photo-com"
  photoPath: String, // Path to event image
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  date: String,
  time: String,
  venue: String,
  category: {
    type: String,
    enum: ['Cultural', 'Technical', 'Gaming']
  },
  prizes: [String],
  teamsize: String,
  registrationFee: {
    type: Number,
    default: 0
  },
  feetype: { 
    type: String, 
    enum: ['individuals', 'team'],
    default: 'individuals'
  },
  guidelines: [String],
  contact: [contactSchema],
  registrationDeadline: String,
  registrationOpen: {
    type: Boolean,
    default: false
  }
}, { 
  collection: 'event',
  timestamps: true 
});

const Event = mongoose.models.Event || 
  mongoose.model('Event', eventSchema);

export default Event;