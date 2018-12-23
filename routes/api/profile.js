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
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

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
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
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
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
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
