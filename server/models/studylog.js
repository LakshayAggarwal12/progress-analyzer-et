const mongoose = require('mongoose');

const studyLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: [true, 'Please add a topic']
  },
  hours: {
    type: Number,
    required: [true, 'Please add study hours'],
    min: 0.1,
    max: 24
  },
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudyLog', studyLogSchema);
