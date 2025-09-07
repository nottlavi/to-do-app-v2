const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  deleteAllUsers,
  verifyEmail,
  resendOTP,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);

//for development purpose only
router.delete("/delete-all-users", deleteAllUsers);

module.exports = router;
