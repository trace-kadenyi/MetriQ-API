const express = require("express");
const router = express.Router();

const {
  getFavourites,
  toggleFavourite,
} = require("../controllers/favouriteController");

// get route
router.get("/", getFavourites);
// post route
router.post("/toggle", toggleFavourite);

module.exports = router;
