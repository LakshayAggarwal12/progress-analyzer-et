const express = require('express');
const { addLog, getLogs, deleteLog } = require('../controllers/logcontroller');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/', protect, addLog);
router.get('/', protect, getLogs);
router.delete('/:id', protect, deleteLog);

module.exports = router;
