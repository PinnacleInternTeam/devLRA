const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
//const config = require('config');
const { check, validationResult } = require("express-validator");
const UserDetails = require("../../models/UserDetails");

const {
  SERVER_ERROR,
  EMAIL_REQUIRED_INVALID,
  PASSWORD_INVALID,
  EMAIL,
  PASSWORD,
  USER_EXISTS,
  INVALID_CREDENTIALS,
  JWT_SECRET,
  STATUS_CODE_200,
  STATUS_CODE_400,
  STATUS_CODE_500,

  EXPIRES_IN,
} = require("../../common/constant/constants");

const {
  LOGIN,
  LOAD_USER,
  GET_ALL_USERS,
  FILTER_USERS,
  CHANGE_PWD,
} = require("../../common/constant/api-constants");

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  LOGIN,
  [
    check(EMAIL, EMAIL_REQUIRED_INVALID).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],

  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    // }

    //retriving Data
    const { useremail, password } = req.body;
  
    try {
      //userEmail Check In DB
      let userDetails = await UserDetails.findOne({
        useremail: useremail,
      });

      if (!userDetails) {
        return res.status(STATUS_CODE_400).json({
          errors: [{ msg: INVALID_CREDENTIALS }],
        });
      }

      //Match The Passwords
      const isMatch = await bcrypt.compare(password, userDetails.password);

      if (!isMatch) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }

      //Create Payload
      const payload = {
        user: {
          id: userDetails._id,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route    GET api/auth
// @desc     Get Authenticated User
// @access   Private
router.get("/load-user", auth, async (req, res) => {
  try {
    const user = await UserDetails.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    GET api/auth
// @desc     Get All Users
// @access   Private
router.get(GET_ALL_USERS, auth, async (req, res) => {
  try {
    const user = await UserDetails.find().select("-password"); //.select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/auth
// @desc     POST Filtered Users Based on Search
// @access   Private
router.post(FILTER_USERS, auth, async (req, res) => {
  const { alphaSearch } = req.body;
  console;
  try {
    let query = {};
    if (alphaSearch !== "") {
      query = {
        fullName: {
          $regex: new RegExp("^" + alphaSearch, "i"),
        },
      };
    }
    userDetails = await UserDetails.find(query).select("-password");

    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/users
// @desc     Change Password
// @access   Private
router.post(
  CHANGE_PWD,
  auth,
  [check("password", "Invalid Request").not().isEmpty()],
  async (req, res) => {
    //validating the Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    }
    //assigning the data from body
    let data = req.body;
    try {
      //Preparing The Salt
      const salt = await bcrypt.genSalt(10);
      //Hashing the Password
      const password = await bcrypt.hash(data.password, salt);

      await UserDetails.findOneAndUpdate(
        { _id: req.user.id },
        { password: password }
      );
      res.json({ msg: "Password changed succesfully" });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
  }
);

// suraksha code
// @route    POST api/users
// @desc      User Registration
// @access   Private
router.post(
  "/add-user-details",
  auth,
  [
    // check(NAME, "Invalid Request").not().isEmpty(),
    // check(EMAIL, "Invalid Request").not().isEmpty().isEmail().normalizeEmail(),
    // check("password", "Invalid Request").not().isEmpty(),
  ],
  async (req, res) => {
    //assigning the data from body
    let data = req.body;
    // data.activCode = shortid.generate();
    try {
      //checking the User Existance
      let userExists = await UserDetails.findOne({ useremail: data.useremail });
      if (userExists) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: USER_EXISTS }] });
      }
      // Assigning the Data To User Model as The data is already Structured
      let userDetails = new UserDetails(data);
      //preparing The Salt
      const salt = await bcrypt.genSalt(10);
      //hashing the Password
      userDetails.password = await bcrypt.hash(data.password, salt);
      //save the Data to db
      await userDetails.save();

      return res.status(STATUS_CODE_200).json({
        msg: "User Added Successfull",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

module.exports = router;
