import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log('token found')
    try {
      // define token, we need token and we don't want Bearer
      token = req.headers.authorization.split(" ")[1];
      // split by the space meaning that Bearer is the 0 index, token is the 1 index
      // now, we get the token

      // decode that token, verify, and we need to pass in secret from our .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(decoded);

      // fetch the user, note: we don't want it to return password
      req.user = await User.findById(decoded.id).select("-password");
      // we put all the User data (except for password) in this req.user,
      // so that now we will have access to all of our protected routes

      next();
    } catch (error) {
      console.error(error);
      res.status(401); // Unauthorized
      // it means that token has failed

      throw new Error("CATCH: Not authorized, token failed!");
    }
  }
  if (!token) {
    res.status(401); // Unauthorized
    throw new Error("Not authorized, no token!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); // Not Authorized
    throw new Error("Not Authorized As Admin");
  }
};

export { protect, admin };
