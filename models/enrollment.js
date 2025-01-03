const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The learner enrolling in the workshop
  },
  workshopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
    required: true, // The workshop being enrolled in
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
