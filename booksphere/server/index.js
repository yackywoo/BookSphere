require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const bookRoutes = require('./routes/book-route');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection is handled in the auth module

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/books', bookRoutes);

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
