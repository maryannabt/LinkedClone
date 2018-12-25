const asm = require("../../utils/async_middleware");
const express = require("express");
const router = express.Router();

router.use(express.json());

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const { verify_token } = require("../../utils/auth_middleware");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
  "/",
  verify_token,
  asm(async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user_id }).populate(
        "user",
        ["name", "avatar"]
      );
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profile);
    } catch (err) {
      return res.status(404).json(err);
    }
  })
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get(
  "/all",
  asm(async (req, res) => {
    const errors = {};

    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar"
      ]);
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profiles);
    } catch (err) {
      return res.status(404).json({ profile: "There are no profiles" });
    }
  })
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get(
  "/handle/:handle",
  asm(async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({
        handle: req.params.handle
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profile);
    } catch (err) {
      return res.status(404).json(err);
    }
  })
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get(
  "/user/:user_id",
  asm(async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profile);
    } catch (err) {
      return res
        .status(404)
        .json({ profile: "There is no profile for this user" });
    }
  })
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  verify_token,
  asm(async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user_id;
    const {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;
    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    // Skills - Split into array
    if (typeof skills !== "undefined") {
      profileFields.skills = skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    const profile = await Profile.findOne({ user: req.user_id });
    if (profile) {
      // Update
      const foundProfile = await Profile.findOneAndUpdate(
        { user: req.user_id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(foundProfile);
    } else {
      // Create

      // Check if handle exists
      const handleProfile = await Profile.findOne({
        handle: profileFields.handle
      });
      if (handleProfile) {
        errors.handle = "That handle already exists";
        return res.status(400).json(errors);
      }

      // Save Profile
      const newProfile = await Profile.create(profileFields);
      return res.status(200).json(newProfile);
    }
  })
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  verify_token,
  asm(async (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const profile = await Profile.findOne({ user: req.user_id });
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    // Add to experience array
    profile.experience.unshift(newExp);

    const expProfile = await profile.save();
    return res.status(200).json(expProfile);
  })
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  verify_token,
  asm(async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const profile = await Profile.findOne({ user: req.user_id });
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    // Add to experience array
    profile.education.unshift(newEdu);

    const eduProfile = await profile.save();
    return res.status(200).json(eduProfile);
  })
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  verify_token,
  asm(async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user_id });
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      const updatedProfile = await profile.save();
      return res.status(200).json(updatedProfile);
    } catch (err) {
      return res.status(404).json(err);
    }
  })
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  verify_token,
  asm(async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user_id });
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Save
      const updatedProfile = await profile.save();
      return res.status(200).json(updatedProfile);
    } catch (err) {
      return res.status(404).json(err);
    }
  })
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  verify_token,
  asm(async (req, res) => {
    await Profile.findOneAndRemove({ user: req.user_id });
    await User.findOneAndRemove({ _id: req.user_id });
    return res.status(200).json({ success: true });
  })
);

module.exports = router;
