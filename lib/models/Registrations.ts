import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: String,
  arrived: { type: Boolean, default: false },
}, { timestamps: false });

const registrationSchema = new mongoose.Schema({
  _id: String, 
  orderId: String,
  signature: String,
  name: String,
  email: String,
  phone: String,
  amount: Number,
  type: { 
    type: String, 
    enum: ['pass', 'event'],
    required: true
  },
  classId: String,
  noOfParticipants: {
    type: Number,
    default: 1
  },
  participantsData: [participantSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'registrations',
  timestamps: true
});

// Create or retrieve model
const Registration = mongoose.models.Registration || 
  mongoose.model('Registration', registrationSchema);

export default Registration;