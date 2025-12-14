const User = require('../models/User');

const followTrainer = async (req, res) => {
  try {
    if (req.role !== 'user') {
      return res.status(403).json({ message: 'Only users can follow trainers' });
    }

    console.log('req.params:', req.params);
    console.log('req.body:', req.body);

    const trainerId = req.params.trainerId || req.body.trainerId;
    console.log('followTrainer called with:', { trainerId, userId: req.userId, role: req.role });

    if (!trainerId) {
      return res.status(400).json({ message: 'Trainer ID is required' });
    }

    if (trainerId === req.userId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const trainer = await User.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    if (trainer.role !== 'trainer') {
      return res.status(400).json({ message: 'User is not a trainer' });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.followedTrainers) {
      user.followedTrainers = [];
    }

    if (user.followedTrainers.includes(trainerId)) {
      return res.status(400).json({ message: 'Already following this trainer' });
    }

    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { followedTrainers: trainerId }, // Use $addToSet to be safe
    });

    res.json({ message: 'Successfully followed trainer' });
  } catch (error) {
    console.error('Follow Error:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};


const unfollowTrainer = async (req, res) => {
  try {
    const trainerId = req.params.trainerId || req.body.trainerId;

    if (!trainerId) {
      return res.status(400).json({ message: 'Trainer ID is required' });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.followedTrainers) {
      user.followedTrainers = [];
    }

    if (!user.followedTrainers.includes(trainerId)) {
      return res.status(400).json({ message: 'Not following this trainer' });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { followedTrainers: trainerId },
    });

    res.json({ message: 'Successfully unfollowed trainer' });
  } catch (error) {
    console.error('Unfollow Error:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const getFollowers = async (req, res) => {
  try {
    // Find users who have the current user's ID in their followedTrainers array
    const followers = await User.find({ followedTrainers: req.userId }).select('name email');
    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers' });
  }
};

module.exports = {
  followTrainer,
  unfollowTrainer,
  getFollowers,
};

