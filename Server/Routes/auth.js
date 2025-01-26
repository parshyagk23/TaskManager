const express = require("express");
const router = express.Router();

const authController = require('../Controller/User');

router.post("/register", authController?.registerUser);
router.post("/login", authController?.loginUser);
router.get("/user/:id", authController?.getuser);
router.get("/user", authController?.getAlluser);

module.exports = router;
