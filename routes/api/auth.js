const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// @route   GET api/auth
// @desc    Get user by auth
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Create user's auth
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Find user
      let user = await User.findOne({ email });

      // See if user not found
      if (!user)
        // Response 400 bad request
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid credentials" }] });

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Response 400 bad request
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid credentials" }] });
      }

      // Send back jsonwebtoken
      // Config payload
      const payload = {
        id: user._id,
      };

      // Sign the token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
