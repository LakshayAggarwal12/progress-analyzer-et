const Roadmap = require('../models/roadmap');
const { generateRoadmap } = require('../services/roadmapservice');

// @desc    Get or generate roadmap
// @route   GET /api/roadmap
// @access  Private
const getRoadmap = async (req, res) => {
  try {
    let roadmap = await Roadmap.findOne({ user: req.user._id });
    if (!roadmap) {
      const topics = await generateRoadmap(req.user.skill, req.user.level);
      roadmap = await Roadmap.create({
        user: req.user._id,
        skill: req.user.skill,
        level: req.user.level,
        topics
      });
    }
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update topic completion
// @route   PATCH /api/roadmap/topic/:topicId
// @access  Private
const updateTopic = async (req, res) => {
  try {
    const { completed } = req.body;
    const roadmap = await Roadmap.findOne({ user: req.user._id });
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

    const topic = roadmap.topics.find(t => t.id === req.params.topicId);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    topic.completed = completed;
    roadmap.updatedAt = new Date();
    await roadmap.save();
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Regenerate roadmap
// @route   POST /api/roadmap/regenerate
// @access  Private
const regenerateRoadmap = async (req, res) => {
  try {
    const topics = await generateRoadmap(req.user.skill, req.user.level);
    const roadmap = await Roadmap.findOneAndUpdate(
      { user: req.user._id },
      { topics, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getRoadmap, updateTopic, regenerateRoadmap };
