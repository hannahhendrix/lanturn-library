const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const favoriteRoutes = require("./routes/favorites");
app.use("/api/favorites", favoriteRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
