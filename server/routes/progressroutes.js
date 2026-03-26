const express = require('express');
const { getProgress, getAIInsight } = require('../controllers/progresscontroller');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();

router.get('/', protect, getProgress);
router.get('/insight', protect, getAIInsight);

module.exports = router;
