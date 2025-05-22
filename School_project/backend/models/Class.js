import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a class name'],
    unique: true,
    trim: true,
  },
  fee: {
    type: Number,
    required: [true, 'Please provide the fee amount'],
    min: [0, 'Fee cannot be negative'],
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Class = mongoose.model('Class', classSchema);

export default Class; 