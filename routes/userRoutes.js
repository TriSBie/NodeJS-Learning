const express = require("express");
const router = express.Router();
const validation = require("../middleware/validationTokenHandler");

const {
  loginUser,
  registerUser,
  currentUser,
} = require("../controller/userControllers");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//validate jwt token when user trying to access private routes.

//we can add multiple middleware in routing method
router.route("/current").get(validation, currentUser);

module.exports = router;
