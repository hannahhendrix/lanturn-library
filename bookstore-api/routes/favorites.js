const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Book = require("../models/Book");

// GET favorites
router.get("/", auth, async (req, res) => {
  if (!req.user?.id) return res.status(400).json({ error: "Missing user ID" });
  const user = await User.findById(req.user.id).populate("favorites");
  res.json(user.favorites);
});

// POST add to favorites
router.post("/:bookId", auth, async (req, res) => {
  const userId = req.user?.id;
  const bookId = req.params.bookId;

  if (!userId || !bookId) {
    return res.status(400).json({ error: "Missing user or book ID" });
  }

  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.favorites.includes(bookId)) {
    return res.status(400).json({ error: "Book already in favorites" });
  }

  user.favorites.push(bookId);
  await user.save();

  res.json({ message: "Book added to favorites" });
});

// DELETE /api/favorites/:bookId — remove book from favorites
router.delete("/:bookId", auth, async (req, res) => {
  const userId = req.user?.id;
  const bookId = req.params.bookId;

  if (!userId || !bookId) {
    return res.status(400).json({ error: "Missing user or book ID" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.favorites = user.favorites.filter((fav) => fav.toString() !== bookId);
  await user.save();

  res.json({ message: "Book removed from favorites" });
});

module.exports = router;
