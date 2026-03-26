const User = require('../models/user');
const PeerConnection = require('../models/peerconnection');

// @desc    Get peers with same skill
// @route   GET /api/peers
// @access  Private
const getPeers = async (req, res) => {
  try {
    const peers = await User.find({
      _id: { $ne: req.user._id },
      skill: req.user.skill
    }).select('name skill level createdAt');
    res.json(peers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get or create chat with peer
// @route   GET /api/peers/chat/:peerId
// @access  Private
const getChat = async (req, res) => {
  try {
    let chat = await PeerConnection.findOne({
      users: { $all: [req.user._id, req.params.peerId] }
    }).populate('users', 'name');
    
    if (!chat) {
      chat = await PeerConnection.create({
        users: [req.user._id, req.params.peerId],
        messages: []
      });
      await chat.populate('users', 'name');
    }
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Send message
// @route   POST /api/peers/chat/:peerId/message
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Message text required' });

    let chat = await PeerConnection.findOne({
      users: { $all: [req.user._id, req.params.peerId] }
    });
    if (!chat) {
      chat = await PeerConnection.create({ users: [req.user._id, req.params.peerId], messages: [] });
    }
    chat.messages.push({ sender: req.user._id, text });
    await chat.save();
    res.json(chat.messages[chat.messages.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPeers, getChat, sendMessage };
