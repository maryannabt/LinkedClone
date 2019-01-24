const asm = require("../../utils/async_middleware");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(express.json());

// Load User Model
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const {
  verify_token,
  false_response,
  tokenize
} = require("../../utils/auth_middleware");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  asm(async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res
        .status(400)
        .json({ ...false_response, message: errors[Object.keys(errors)[0]] });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = "User with this email already exists";
      return res
        .status(400)
        .json({ ...false_response, message: errors[Object.keys(errors)[0]] });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const user_data = {
      ...req.body,
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

// @route   POST api/auth/login
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

// @route   GET api/auth/me
// @desc    Return current user
// @access  Private
router.get(
  "/me",
  verify_token,
  asm(async (req, res) => {
    const user = await User.findById(req.user_id);
    if (!user) return res.status(404).json({ message: "No user found." });
    console.log("Token: ", req.user_id);
    return res.status(200).json({
      user,
      auth: true
    });
  })
);

// @route   POST api/auth/update/:id
// @desc    Update current user
// @access  Public

router.post(
  "/update/:id",
  asm(async (req, res) => {
    try {
      const selectedUser = await User.findById(req.params.id);
      await selectedUser.updateOne(req.body);
      const updatedUser = await User.findById(req.params.id);
      return res.status(200).json({ selectedUserUpdate: updatedUser });
    } catch (err) {
      next(new Error(err));
    }
  })
);

module.exports = router;
