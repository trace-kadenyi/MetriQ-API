const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

// GET /api/user/theme → { theme: "dark" }
router.get("/theme", (req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    return res.json({ theme: null });            // anonymous
  }
  return res.json({ theme: req.user.theme || "light" });
});

// PATCH /api/user/theme { theme:"dark" }
router.patch("/theme", async (req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const { theme } = req.body;
  if (!["light", "dark"].includes(theme))
    return res.status(400).json({ message: "Invalid theme" });

  await User.findByIdAndUpdate(req.user._id, { theme });
  res.json({ success: true });
});

module.exports = router;
