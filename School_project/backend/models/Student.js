import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, 'Please provide roll number'],
    unique: true,
    trim: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Please provide class'],
  },
  feeStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    default: 'Pending',
  },
  amount: {
    type: Number,
    required: [true, 'Please provide fee amount'],
    min: [0, 'Amount cannot be negative'],
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student; 