const express = require("express");
const router = express.Router();
const { getContacts } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getContacts);

module.exports = router;
