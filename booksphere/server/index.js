require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection is handled in the auth module

// Routes
app.use("/api/auth", authRoutes);

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
