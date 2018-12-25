const asm = require("../../utils/async_middleware");
const express = require("express");
const router = express.Router();

router.use(express.json());

// Load Post Model
const Post = require("../../models/Post");

// Load Validation
const validatePostInput = require("../../validation/post");

const { verify_token } = require("../../utils/auth_middleware");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  verify_token,
  asm(async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body;
    const post_data = { text, name, avatar, user: req.user_id };
    const newPost = await Post.create(post_data);
    return res.status(200).json(newPost);
  })
);

module.exports = router;
