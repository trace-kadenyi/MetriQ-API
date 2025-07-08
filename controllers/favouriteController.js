// controllers/favouritesController.js
const Favourites = require("../models/FavouriteSchema");
const { getUserId } = require("../utils/getUserId"); // ✅ import helper

/** Helper – returns { owner: … } *or* { anonId: … } */
const extractIdent = (req) => {
  const id = getUserId(req); // Mongo _id OR anonId
  if (!id) return null;

  // If the request is authenticated, id is an ObjectId
  if (req.user && req.isAuthenticated()) {
    return { owner: id };
  }
  // Otherwise it’s an anonId string
  return { anonId: id };
};

/** Helper – find or create per-user favourites doc */
const getList = async (ident) => {
  if (!ident) throw new Error("Missing user identifier");

  let doc = await Favourites.findOne(ident);
  if (!doc) {
    doc = await Favourites.create({ ...ident, favourites: [] });
  }
  return doc;
};

/** GET /api/favourites */
const getFavourites = async (req, res) => {
  try {
    const ident = extractIdent(req); // ✅ uses new helper
    const list = await getList(ident);
    res.status(200).json({ success: true, favourites: list.favourites });
  } catch (err) {
    console.error("Failed to fetch favourites:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving favourites" });
  }
};

/** POST /api/favourites/toggle */
const toggleFavourite = async (req, res) => {
  try {
    const ident = extractIdent(req); // ✅ uses new helper
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Missing or invalid URL." });
    }

    const list = await getList(ident);
    const alreadySaved = list.favourites.includes(url);

    if (alreadySaved) {
      list.favourites.pull(url);
    } else {
      if (list.favourites.length >= 5) {
        return res
          .status(400)
          .json({
            success: false,
            message: "You can only save up to 5 favourites.",
          });
      }
      list.favourites.addToSet(url);
    }

    await list.save();
    res.status(200).json({ success: true, favourites: list.favourites });
  } catch (err) {
    console.error("Failed to toggle favourite:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error toggling favourite" });
  }
};

module.exports = { getFavourites, toggleFavourite };
