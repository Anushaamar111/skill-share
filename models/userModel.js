import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["instructor", "learner"],
      required: true,
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    photoUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/oJUxonEvz7P_qkOC_-rYriP6a_qd9HESeJEXuACr75k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk5LzczLzI2/LzM2MF9GXzI5OTcz/MjY2OF9nWnFLVmJ1/Mktqcm9MWXRUOWhS/WmZFMzdBWldGSEpR/bi5qcGc",
    },
  },
  { timestamp: "true" }
);

export const User = mongoose.model('User', userSchema);
