const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  //fetching the token and sending suitable response

  const token = req.cookies.access_token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "not authenticated to visit this page / token not found",
    });

  //checking/verifying the token here
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        success: false,
        message: "token not verified / invalid token",
      });
    req.user = decoded;
    next();
  });
};

exports.isUser = (req, res, next) => {
  const email = req.user.email;


}
