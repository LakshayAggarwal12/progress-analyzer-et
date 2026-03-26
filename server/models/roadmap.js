const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  order: Number
});

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  skill: String,
  level: String,
  topics: [topicSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
