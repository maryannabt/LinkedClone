const asm = require("../../utils/async_middleware");
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

router.use(express.json());

// Load user model
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const {
  verify_token,
  false_response,
  tokenize
} = require("../../utils/auth_middleware");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  asm(async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const user_data = {
      ...req.body,
      avatar,
      password: hashedPassword
    };
    const newUser = await User.create(user_data);

    // Create a token
    const token = tokenize(newUser._id);

    return res.status(200).json({
      auth: true,
      token,
      user: newUser
    });
  })
);

// @route   GET api/users/login
// @desc    Login user / Returning JWT token
// @access  Public
router.post(
  "/login",
  asm(async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Extract from req.body the credentials the user entered
    const { email, password } = req.body;

    // Look for the user in db by email
    const user = await User.findOne({ email });

    // If no user found...
    if (!user) return res.status(401).json(false_response);

    // Check if the password is valid
    const password_is_valid = await bcrypt.compare(password, user.password);
    if (!password_is_valid) return res.status(401).json(false_response);

    // If user is found and password is valid
    // Create a fresh new token
    const token = tokenize(user._id);

    // Return the information including token as JSON
    return res.status(200).json({
      auth: true,
      token
    });
  })
);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  verify_token,
  asm(async (req, res) => {
    const user = await User.findById(req.user_id);
    if (!user) return res.status(404).json({ message: "No user found." });
    res.status(200).json(user);
  })
);

module.exports = router;
