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

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get(
  "/",
  asm(async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(404).json({ nopostsfound: "No posts found" });
    }
  })
);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get(
  "/:id",
  asm(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(404)
        .json({ nopostfound: "No post found with that ID" });
    }
  })
);

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

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  verify_token,
  asm(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // Check for post owner
      if (post.user.toString() !== req.user_id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }

      // Delete
      await post.remove();
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(404).json({ postnotfound: "No post found" });
    }
  })
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  verify_token,
  asm(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.likes.filter(like => like.user.toString() === req.user_id).length >
        0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });
      }

      // Add user id to likes array
      post.likes.unshift({ user: req.user_id });

      const likedPost = await post.save();
      return res.status(200).json(likedPost);
    } catch (err) {
      return res.status(404).json({ postnotfound: "No post found" });
    }
  })
);

// @route   POST api/posts/unlike/:id
// @desc    Unike post
// @access  Private
router.post(
  "/unlike/:id",
  verify_token,
  asm(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.likes.filter(like => like.user.toString() === req.user_id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: "You have not yet liked this post" });
      }

      // Get remove index
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user_id);

      // Splice out of array of likes
      post.likes.splice(removeIndex, 1);

      // Save
      const unlikedPost = await post.save();
      return res.status(200).json(unlikedPost);
    } catch (err) {
      return res.status(404).json({ postnotfound: "No post found" });
    }
  })
);

module.exports = router;
