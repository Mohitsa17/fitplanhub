const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Plan = require('../models/Plan');

const subscribeToPlan = async (req, res) => {
  try {
    if (req.role !== 'user') {
      return res.status(403).json({ message: 'Only users can subscribe to plans' });
    }

    const planId = req.params.planId || req.body.planId;

    if (!planId) {
      return res.status(400).json({ message: 'Plan ID is required' });
    }

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const existingSubscription = await Subscription.findOne({
      user: req.userId,
      plan: planId,
    });

    if (existingSubscription) {
      return res.status(400).json({ message: 'Already subscribed to this plan' });
    }

    const subscription = new Subscription({
      user: req.userId,
      plan: planId,
    });

    await subscription.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { subscribedPlans: planId },
    });

    res.status(201).json({ message: 'Successfully subscribed to plan' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to plan' });
  }
};

const getSubscribedPlans = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.userId })
      .populate({
        path: 'plan',
        populate: { path: 'trainer', select: 'name email' }
      })
      .sort({ createdAt: -1 });

    const plans = subscriptions.map(sub => {
      const planObj = sub.plan.toObject();
      planObj.isSubscribed = true;
      return planObj;
    });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribed plans' });
  }
};

module.exports = {
  subscribeToPlan,
  getSubscribedPlans,
};

