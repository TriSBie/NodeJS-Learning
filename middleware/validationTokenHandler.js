const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validation = asyncHandler(async (req, res, next) => {
  //check the token was embedded inside the request header
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    //split the token string with sample "Bearer <JWT>" - get only <JWT> encode
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log(decoded);
    });
  }
});

module.exports = validation;
