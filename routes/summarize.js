const express = require("express");
const router = express.Router();
const { createAISummary } = require("../controllers/aiSummaryController");

router.post("/", createAISummary);

module.exports = router;
