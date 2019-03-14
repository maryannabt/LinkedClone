const asm = require("../../utils/async_middleware");
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");

require("dotenv").config();

const router = express.Router();
router.use(express.json());

// Load Models
const User = require("../../models/User");

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
  asm(async (req, res) => {
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
  })
);

// Finish SignUp without user avatar
router.post(
  "/finish/noavatar/:id",
  asm(async (req, res) => {
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
  })
);

// If there is a search string - get 10 last created users that match the search request (filtering by first or last name) for search result
// If the search string is empty - get 10 last created users (except for the logged in user) for search result
router.get(
  "/search/:id",
  asm(async (req, res) => {
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
  })
);

module.exports = router;
