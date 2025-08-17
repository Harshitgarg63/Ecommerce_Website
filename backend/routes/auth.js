const express = require("express");
const { register, login , getMe} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe); // ✅ Add this

module.exports = router;
