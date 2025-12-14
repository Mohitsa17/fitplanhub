const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { followTrainer, unfollowTrainer, getFollowers } = require('../controllers/followController');

router.post('/follow/:trainerId', authMiddleware, followTrainer);

router.post('/unfollow/:trainerId', authMiddleware, unfollowTrainer);

router.get('/followers', authMiddleware, getFollowers);

module.exports = router;

