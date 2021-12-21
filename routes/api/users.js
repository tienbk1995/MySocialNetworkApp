const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const auth = require("../../middleware/auth");

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
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

      // See if user exists already
      if (user)
        // Response 400 bad request
        return res
          .status(400)
          .json({ error: [{ msg: "User already exists" }] });

      // Set avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Generate salt
      const salt = await bcrypt.genSalt(10);

      // Create hash by password
      user.password = await bcrypt.hash(password, salt);

      // Save user into db
      await user.save();

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

// @route   POST api/users/reset-password
// @desc    Reset Password route
// @access  Public
router.post(
  "/reset-password",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email } = req.body;

    try {
      // Find user
      let user = await User.findOne({ email });

      // See if user has not been found in db
      if (!user)
        // Response 400 bad request
        return res
          .status(400)
          .json({ error: [{ msg: "User has not registered yet" }] });
      // Do send the link renew password to user's email
      // Send back jsonwebtoken
      // Config payload
      const payload = {
        id: user._id,
        password: user.password,
      };
      // Sign the token
      let token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 360000,
      });
      const publicLink = `https://pure-reaches-53373.herokuapp.com/renew-password/${token}`;

      const localLink = `http://localhost:3000/renew-password/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tienphanautoemail@gmail.com",
          pass: "054536246",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: "tienphanautoemail@gmail.com",
        to: email,
        subject: "Email to reset your password",
        text: publicLink,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).send("server error");
        } else {
          console.log("Email sent: " + info.response);
          res.json(publicLink);
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   POST api/users/renew-password
// @desc    Renew Password route
// @access  Public
router.post(
  "/renew-password",
  auth,
  check("password", "Please enter a valid password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { password } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) return res.status(400).send({ msg: "user not found" });
      // Generate salt
      const salt = await bcrypt.genSalt(10);
      // Create hash by password
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.json(user.password);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
