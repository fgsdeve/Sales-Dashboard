const express = require("express");
const router = express.Router();
const { getCompanies } = require("../controllers/companyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCompanies);

module.exports = router;
