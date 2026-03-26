const express = require('express');
const { getPeers, getChat, sendMessage } = require('../controllers/peercontroller');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();

router.get('/', protect, getPeers);
router.get('/chat/:peerId', protect, getChat);
router.post('/chat/:peerId/message', protect, sendMessage);

module.exports = router;
