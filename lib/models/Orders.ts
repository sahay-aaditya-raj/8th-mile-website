import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: String,
  arrived: { type: Boolean, default: false },
}, { timestamps: false });

const orderSchema = new mongoose.Schema({
  _id: String, 
  merchantOrderId: String,
  phonePayOrderId: String,
  paymentStatus: { 
    type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    required: true
  },
  mailSent: {
    type: Boolean,
    default: false
  },
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
  collection: 'orders',
  timestamps: true
});

// Create or retrieve model
const Order = mongoose.models.Order || 
  mongoose.model('Order', orderSchema);

export default Order;