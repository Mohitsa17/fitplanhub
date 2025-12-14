const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    category: {
      type: String,
      required: true,
      default: 'General Fitness',
    },
    equipment: {
      type: String,
      required: true,
      default: 'None',
    },
    frequency: {
      type: String,
      required: true,
      default: '3 days/week',
    },
    image: {
      type: String,
      required: false,
      default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Plan', planSchema);

