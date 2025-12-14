const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { subscribeToPlan, getSubscribedPlans } = require('../controllers/subscriptionController');

router.get('/', authMiddleware, getSubscribedPlans);

router.post('/:planId', authMiddleware, subscribeToPlan);

module.exports = router;

