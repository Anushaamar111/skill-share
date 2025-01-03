import e from "express";
import mongoose from 'mongoose'

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The instructor creating the workshop
  },
  fee: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
    location: {
        type: String,
        required: true
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
   announcements: [{
        type: String
    }],
  capacity: {
    type: Number,
    required: true, // Maximum number of participants
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
}, {
  timestamps: true,
});

const Workshop = mongoose.model('Workshop', workshopSchema);
export { Workshop };
