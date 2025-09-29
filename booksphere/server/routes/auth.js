const express = require("express");
const { body, validationResult } = require("express-validator");
const { createUser, authenticateUser, getUserById, verifyToken } = require("../auth");

const router = express.Router();

// register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be >= 6 chars"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, firstName, lastName } = req.body;
    try {
      const result = await createUser({ email, password, firstName, lastName });
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// signup (alias for register)
router.post("/signup", async (req, res) => {
  // Forward to register route
  req.url = "/register";
  router.handle(req, res);
});

// login
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const result = await authenticateUser(email, password);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// signin (alias for login)
router.post("/signin", async (req, res) => {
  // Forward to login route
  req.url = "/login";
  router.handle(req, res);
});

// verify token
router.get("/verify", async (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.replace(/^Bearer\s+/, "");
  if (!token) return res.status(401).json({ success: false, message: "Missing token" });
  
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// me (alias for verify)
router.get("/me", async (req, res) => {
  // Forward to verify route
  req.url = "/verify";
  router.handle(req, res);
});

module.exports = router;
