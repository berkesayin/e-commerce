import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public route (No token needed)

const authUser = asyncHandler(async (req, res) => {
  // get data from the body
  // req.body;

  const { email, password } = req.body;

  // res.send({
  //   email,
  //   password,
  // })

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private route (token needed)

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // check for user
  if(user) {
    // return that for the logged in user
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404); // Not Found
    throw new Error('User Not Found')
  }
});

export { authUser, getUserProfile };
