const StudyLog = require('../models/studylog');

// @desc    Add study log
// @route   POST /api/logs
// @access  Private
const addLog = async (req, res) => {
  try {
    const { topic, hours, notes, date } = req.body;
    if (!topic || !hours) {
      return res.status(400).json({ message: 'Topic and hours are required' });
    }
    const log = await StudyLog.create({
      user: req.user._id,
      topic,
      hours,
      notes: notes || '',
      date: date || new Date()
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's study logs
// @route   GET /api/logs
// @access  Private
const getLogs = async (req, res) => {
  try {
    const logs = await StudyLog.find({ user: req.user._id }).sort({ date: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a study log
// @route   DELETE /api/logs/:id
// @access  Private
const deleteLog = async (req, res) => {
  try {
    const log = await StudyLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    if (log.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await log.deleteOne();
    res.json({ message: 'Log deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addLog, getLogs, deleteLog };
