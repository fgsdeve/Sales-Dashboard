const express = require("express");
const router = express.Router();
const { getDeals } = require("../controllers/dealController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getDeals);

module.exports = router;
