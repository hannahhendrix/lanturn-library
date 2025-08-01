const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// Get all books without pagination (for internal use)
router.get("/all", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books with pagination and optional search
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/books with image upload
router.post('/', auth, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, author, genre, publishedYear, price, inStock, description } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : '';

    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      price,
      inStock,
      description,
      coverImage,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Update a book
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a book
router.delete("/:id", auth, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/books/upload - upload a book cover image
router.post("/upload", upload.single("cover"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ imagePath });
});

module.exports = router;
