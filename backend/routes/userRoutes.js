const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  deleteAllUsers,
  verifyEmail,
  resendOTP,
  getProfile,
} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/userMiddlewares");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);
router.get("/profile", verifyToken, getProfile);

//for development purpose only
router.delete("/delete-all-users", deleteAllUsers);

module.exports = router;
