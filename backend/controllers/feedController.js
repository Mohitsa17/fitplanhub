const User = require('../models/User');
const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');

const getUserFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('followedTrainers', 'name email');

    if (!user.followedTrainers || user.followedTrainers.length === 0) {
      return res.json({ feed: [] });
    }

    const trainerIds = user.followedTrainers.map((trainer) => trainer._id);

    const plans = await Plan.find({ trainer: { $in: trainerIds } })
      .populate('trainer', 'name email')
      .sort({ createdAt: -1 });

    const userSubscriptions = await Subscription.find({
      user: req.userId,
    });

    const subscribedPlanIds = userSubscriptions.map((sub) => sub.plan.toString());

    const feed = plans.map((plan) => {
      const planObj = plan.toObject();
      planObj.isSubscribed = subscribedPlanIds.includes(plan._id.toString());
      return planObj;
    });

    res.json({ feed });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed' });
  }
};

module.exports = {
  getUserFeed,
};

