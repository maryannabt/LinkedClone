const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");

require("dotenv").config();

const router = express.Router();
router.use(express.json());

// Load Models
const User = require("../../models/User");
const Post = require("../../models/Post");
const Like = require("../../models/Like");
const Comment = require("../../models/Comment");
const Subcomment = require("../../models/Subcomment");

// Multer allows access to files submitted through the form. We need a route to catch the data from the file form.
// Multer automatically handles the file upload and puts the file in the "/tmp/uploads" directory that we set in the "upload" middleware.
// The file can then be accessed from the request by accessing req.file.
const upload = multer({ dest: "/tmp/uploads" });

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// Cloudinary is used for configuration and uploading.
// Every time we deploy our project, all files are replaced with the latest version of our project (any user uploaded files are removed).
// To get around this, we need to copy uploaded files to a 3rd party service such as Cloudinary.
// In our case the images are uploaded by the users of our application through a web form.
// In our post route, we add "upload" as a middleware and we pass the temporary path of the req.file
// (Multer API - req.file.path - the file that needs to be uploaded) to the Cloudinary's uploader.
// This will take in the file, upload it to Cloudinary, and return an object with the file information (result).
// The result will have information regarding the Cloudinary upload.
// Cloudinary will automatically generate a URL to the result (the uploaded image) through which it can be accessed (result.url).
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

// Finish SignUp with user avatar
router.post(
  "/finish/:id",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const selectedUser = await User.findById(req.params.id);

      let result = await cloudinary.v2.uploader.upload(req.file.path);

      await selectedUser.updateOne({
        registrationWizard: "done",
        avatar: result.url
      });
      const updatedUser = await User.findById(req.params.id);

      return res.status(200).json({ selectedUserUpdate: updatedUser });
    } catch (err) {
      console.log("New Error: ", err);
    }
  }
);

// Finish SignUp without user avatar
router.post(
  "/finish/noavatar/:id",
  async (req, res) => {
    try {
      const selectedUser = await User.findById(req.params.id);
      await selectedUser.updateOne({
        registrationWizard: "done",
        avatar:
          "https://res.cloudinary.com/nooly/image/upload/v1548464815/img/blank-profile-picture.png"
      });
      const updatedUser = await User.findById(req.params.id);

      return res.status(200).json({ selectedUserUpdate: updatedUser });
    } catch (err) {
      console.log("New Error: ", err);
    }
  }
);

// If there is a search string - get 10 last created users that match the search request (filtering by first or last name) for search result
// If the search string is empty - get 10 last created users (except for the logged in user) for search result
router.get(
  "/search/:id",
  async (req, res) => {
    try {
      if (req.query.search !== "") {
        const searchSuggestions = await User.find({
          _id: { $ne: req.params.id },
          $or: [
            { first_name: { $regex: req.query.search, $options: "i" } },
            { last_name: { $regex: req.query.search, $options: "i" } }
          ]
        })
          .sort({ createdAt: -1 })
          .limit(10);

        return res.json(searchSuggestions);
      } else {
        const searchSuggestions = await User.find({
          _id: { $ne: req.params.id }
        })
          .sort({ createdAt: -1 })
          .limit(10);
        return res.json(searchSuggestions);
      }
    } catch (err) {
      console.log("Your Error is: ", err);
      return res.json(err);
    }
  }
);

// Create new Post
router.post(
  "/create/post",
  upload.single("img"),
  async (req, res) => {
    try {
      let body = JSON.parse(req.body.text);

      if (req.file) {
        let result = await cloudinary.v2.uploader.upload(req.file.path);
        const post = new Post({ ...body, img: result.url });
        await post.save();
        let postAuthUser = await User.findById(body.userID).lean();
        let postInfo = await Post.findById(post._id).lean();
        let newPost = {
          likes: [],
          comments: [],
          postAuthUser,
          ...postInfo
        };
        return res.json({
          postSaved: true,
          post: newPost
        });
      } else {
        const post = new Post(body);
        await post.save();
        let postAuthUser = await User.findById(body.userID).lean();
        let postInfo = await Post.findById(post._id).lean();
        let newPost = {
          likes: [],
          comments: [],
          postAuthUser,
          ...postInfo
        };
        return res.json({
          postSaved: true,
          post: newPost
        });
      }
    } catch (err) {
      console.log("New Error: ", err);
    }
  }
);

// Get 10 posts with their likes and comments, omitting the logged in user's posts
router.get(
  "/posts/:id",
  async (req, res) => {
    let offSet = parseInt(req.query.offset);
    try {
      // const posts = await Post.find({ userID: { $ne: req.params.id } })
      //   .sort({ createdAt: -1 })
      //   .limit(10)
      //   .skip(offSet)
      //   .lean();

      const posts = await Post.find({ })
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(offSet)
        .lean();

      let newArr = [];

      for (let i = 0; i < posts.length; i++) {
        let postAuthUser = await User.findById(posts[i].userID);
        let likes = await Like.find({ targetID: posts[i]._id });
        let comments = await Comment.find({ targetID: posts[i]._id }).lean();
        newArr[i] = { ...posts[i], comments, likes, postAuthUser };
      }
      return res.json([...newArr]);
    } catch (err) {
      console.log("New Error: ", err);
      return res.json(err);
    }
  }
);

// Create new Like
router.post(
  "/create/like",
  async (req, res) => {
    try {
      const like = await Like.findOne({
        targetID: req.body.targetID,
        userID: req.body.userID
      });
      if (like) {
        await like.delete();
        return res.json({ likeMsg: "Like Deleted!" });
      } else {
        const like = new Like(req.body);
        await like.save();
        return res.json({ likeMsg: "Like Saved!" });
      }
    } catch (err) {
      console.log("New Error: ", err);
      return res.json(err);
    }
  }
);

// Create new Comment
router.post(
  "/create/comment",
  async (req, res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save();
      let postAuthUser = await User.findById(req.body.userID).lean();
      let commentInfo = await Comment.findById(comment._id).lean();

      let newComment = {
        likes: [],
        subComments: [],
        userInfo: postAuthUser,
        ...commentInfo
      };

      return res.json({
        msg: "Comment Saved!",
        comment: newComment
      });
    } catch (err) {
      console.log("New Error: ", err);
      return res.json(err);
    }
  }
);

// Create new SubComment
router.post(
  "/create/subcomment",
  async (req, res) => {
    try {
      const subComment = new Subcomment(req.body);
      await subComment.save();
      let postAuthUser = await User.findById(req.body.userID).lean();
      let subCommentInfo = await Subcomment.findById(subComment._id).lean();

      let newSubComment = {
        likes: [],
        subUserInfo: postAuthUser,
        ...subCommentInfo
      };

      return res.json({
        msg: "SubComment Saved!",
        subcomment: newSubComment
      });
    } catch (err) {
      console.log("New Error: ", err);
      return res.json(err);
    }
  }
);

// Get Comments for Post
router.get(
  "/comment/:id",
  async (req, res) => {
    try {
      const comments = await Comment.find({ targetID: req.params.id })
        .sort({ createdAt: 1 })
        .lean();

      let newArr = [];

      for (let i = 0; i < comments.length; i++) {
        let userInfo = await User.findById(comments[i].userID);
        let likes = await Like.find({ targetID: comments[i]._id });
        let subComments = await Subcomment.find({
          targetID: comments[i]._id
        }).lean();

        let subCommentsWithInfo = [];
        for (let subComment of subComments) {
          let subUserInfo = await User.findById(subComment.userID).lean();
          let likes = await Like.find({ targetID: subComment._id });
          let sub = await { ...subComment, subUserInfo, likes };
          await subCommentsWithInfo.push(sub);
        }

        newArr[i] = {
          ...comments[i],
          userInfo,
          likes,
          subComments: subCommentsWithInfo
        };
      }
      return res.json({
        commentsArr: [...newArr],
        postID: req.params.id
      });
    } catch (err) {
      console.log("New Error: ", err);
      return res.json(err);
    }
  }
);

// Get Likes for specific post
router.get(
  "/likes/:id",
  async (req, res) => {
    try {
      const likes = await Like.find({ targetID: req.params.id }).lean();

      let likesArr = [];
      for (let i = 0; i < likes.length; i++) {
        let userInfo = await User.findById(likes[i].userID);
        likesArr[i] = { ...likes[i], userInfo };
      }

      return res.json([...likesArr]);
    } catch (err) {
      console.log("New Error: ", err);
      return res.json(err);
    }
  }
);

// Get a selected user profile and 10 users he can follow
router.get("/profile/:id", async (req, res) => {
  let limitInt = parseInt(req.query.limit);
  try {
    const user = await User.findById(req.params.id);
    const usersToFollow = await User.find({ _id: { $ne: req.params.id } })
      .sort({ createdAt: -1 })
      .limit(limitInt);
    const userLastComments = await Comment.find({ userID: req.params.id })
      .sort({ createdAt: -1 })
      .limit(4);

    return res.json({
      user,
      usersToFollow,
      userLastComments
    });
  } catch (err) {
    console.log("New Error: ", err);
  }
});

// Get the users to follow for the logged in user
router.get('/userstofollow/:id', async (req, res, next) => {
  let limitInt = parseInt(req.query.limit)
  
  try {
      const users = await User.find({ _id: { $ne: req.params.id } }).sort({ createdAt: -1 }).limit(limitInt)
      res.json({ users })

  } catch (err) {
      console.log('New Error: ', err)
  }
})

module.exports = router;
