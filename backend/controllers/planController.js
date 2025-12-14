const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');

const createPlan = async (req, res) => {
  try {
    if (req.role !== 'trainer') {
      return res.status(403).json({ message: 'Only trainers can create plans' });
    }

    const { title, description, price, duration } = req.body;

    if (!title || !description || !price || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const plan = new Plan({
      title,
      description,
      price,
      duration,
      trainer: req.userId,
    });

    await plan.save();

    res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan' });
  }
};

const getMyPlans = async (req, res) => {
  try {
    if (req.role !== 'trainer') {
      return res.status(403).json({ message: 'Only trainers can view their plans' });
    }

    const plans = await Plan.find({ trainer: req.userId });

    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans' });
  }
};

const updatePlan = async (req, res) => {
  try {
    if (req.role !== 'trainer') {
      return res.status(403).json({ message: 'Only trainers can update plans' });
    }

    const { id } = req.params;
    const { title, description, price, duration } = req.body;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    if (plan.trainer.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own plans' });
    }

    if (title) plan.title = title;
    if (description) plan.description = description;
    if (price !== undefined) plan.price = price;
    if (duration) plan.duration = duration;

    await plan.save();

    res.json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan' });
  }
};

const deletePlan = async (req, res) => {
  try {
    if (req.role !== 'trainer') {
      return res.status(403).json({ message: 'Only trainers can delete plans' });
    }

    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    if (plan.trainer.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only delete your own plans' });
    }

    await Plan.findByIdAndDelete(id);

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan' });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id).populate('trainer', 'name');

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    if (req.role === 'trainer') {
      return res.json({ plan });
    }

    const subscription = await Subscription.findOne({
      user: req.userId,
      plan: id,
    });

    if (subscription) {
      return res.json({ plan });
    }

    const limitedPlan = {
      title: plan.title,
      price: plan.price,
      trainer: plan.trainer ? { name: plan.trainer.name } : null,
    };

    res.json({ plan: limitedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plan' });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate('trainer', 'name email');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans' });
  }
};

module.exports = {
  createPlan,
  getMyPlans,
  updatePlan,
  deletePlan,
  getPlanById,
  getAllPlans,
};

