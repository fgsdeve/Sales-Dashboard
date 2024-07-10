const express = require('express');
const router = express.Router();
const { getLeads } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getLeads);

module.exports = router;
