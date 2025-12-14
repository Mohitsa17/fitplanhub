const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserFeed } = require('../controllers/feedController');

router.get('/', authMiddleware, getUserFeed);

module.exports = router;

