const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createPlan, getMyPlans, updatePlan, deletePlan, getPlanById, getAllPlans } = require('../controllers/planController');

router.post('/', authMiddleware, roleMiddleware('trainer'), createPlan);
router.get('/', authMiddleware, getAllPlans);
router.get('/my', authMiddleware, roleMiddleware('trainer'), getMyPlans);
router.put('/:id', authMiddleware, roleMiddleware('trainer'), updatePlan);
router.delete('/:id', authMiddleware, roleMiddleware('trainer'), deletePlan);
router.get('/:id', authMiddleware, getPlanById);


module.exports = router;

