require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const bookRoutes = require('./routes/book-route');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// MongoDB connection is handled in the auth module
=======
// Connect to MongoDB
mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
>>>>>>> 1eb93055114a9bc0f4f289f68542009ea1ebe754

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/books', bookRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
