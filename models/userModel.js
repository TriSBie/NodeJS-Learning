// 1. Import module mongoose
const moongose = require("mongoose");

// 2. defining Mongoose Schema
const userSchema = moongose.Schema(
  {
    username: {
      type: String,
      require: [true, "User is required to fill"],
    },
    email: {
      type: String,
      require: [true, "Email is required to fill"],
      unique: [true, "Email address already taken"], //prevent the user register with the same or regist an emails already exists.
    },
    password: {
      type: String,
      require: [true, "Password is required to fill"],
    },
  },
  {
    timestamps: true,
  }
);
//model is instance of document
module.exports = moongose.model("User", userSchema);
