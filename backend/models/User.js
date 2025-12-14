const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
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
    role: {
      type: String,
      enum: ['user', 'trainer'],
      default: 'user',
    },
    followedTrainers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    subscribedPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
      },
    ],
    profile: {
      bio: { type: String, default: '' },
      brandName: { type: String, default: '' },
      serviceName: { type: String, default: '' },
      profileImage: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

