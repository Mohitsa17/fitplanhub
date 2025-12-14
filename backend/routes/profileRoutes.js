const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Plan = require('../models/Plan');
const authMiddleware = require('../middleware/authMiddleware');

console.log('authMiddleware in profileRoutes:', authMiddleware);

// @desc    Get trainer profile by ID (Public)
// @route   GET /api/profile/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        // If the user is a trainer, fetch their plans too
        let plans = [];
        if (user.role === 'trainer') {
            plans = await Plan.find({ trainer: user._id });
        }

        res.json({
            user,
            plans,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update own profile (Trainer only)
// @route   PUT /api/profile
// @access  Private
router.put('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.profile) {
            user.profile = {
                ...user.profile,
                ...req.body.profile,
            };
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profile: updatedUser.profile,
            token: req.headers.authorization.split(' ')[1], // Return same token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
