/**In order using HTTP interact with mongoose - we have to using async-await function
 * An error may happens occurs CONNECTION_ERROR
 * => using express-async-handler
 */
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc REGISTER a new User
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  //1. check the request body
  const { username, email, password } = req.body;

  //2. If 1 or 3 requires field are not inputted => throw an Error
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }

  //3.  After no error occurs -> create User
  //3.1 Before create a new User - check user's email already taken or not
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(404);
    throw new Error("User already registered");
  }

  // usage of bcrypt
  // await function(myPlainTextPassword, saltRounds);
  const hashedPassword = await bcrypt.hash(password, 10);

  //4. Create new user if already citeria matches correctly
  const userRegistration = await User.create({
    username,
    password: hashedPassword,
    email,
  });
  if (userRegistration) {
    res.status(201).json(userRegistration);
  } else {
    res.status(400);
    throw new Error("Register new user failed/ User is not valid");
  }
  res.json({
    message: "Register successfully",
    content: userRegistration,
  });
});

//@desc LOGIN with User
//@route POST /api/users
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  // compare current password with hashed password in mongoDB storedd
  if (user && (await bcrypt.compare(password, user.password))) {
    // usage of jwt - jwt.sign(payload, secretORPrivateKey,[option, callback])
    // by default the algorithm is HS256
    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      // we also supply the Token Expiration with NumericDate for access token ~ authentication usage
      // NOTE : A JSON numeric value representing the number of seconds from 1970-01-01T00:00:00Z UTC
      { expiresIn: "1m" }
    );
    //if the comparation succesful -> create an access token to the user
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is in valid");
  }
  res.json({
    message: "Login successfully",
  });
});

//@desc View the current User
//@route POST /api/users
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({
    message: "Current Information",
  });
});

// //@desc DELETE a user with id given
// //@route POST /api/users
// //@access public
// const deleteUser = asyncHandler(async (req, res) => {
//   res.json({
//     message: "Delete user successfully",
//   });
// });

module.exports = {
  loginUser,
  registerUser,
  currentUser,
};
