const express = require('express');
const { getRoadmap, updateTopic, regenerateRoadmap } = require('../controllers/roadmapcontroller');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();

router.get('/', protect, getRoadmap);
router.patch('/topic/:topicId', protect, updateTopic);
router.post('/regenerate', protect, regenerateRoadmap);

module.exports = router;
