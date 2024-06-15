const express = require('express');
const router = express.Router();
const {getHome, registerUser, postRegister, loginUser, postLogin, getDashboard, sendMail} = require("../controller/user.controller")

router.get("/", getHome)
router.get("/register", registerUser)
router.post("/register", postRegister)
router.get("/login", loginUser)
router.post("/login", postLogin)
router.get("/dashboard", getDashboard)
router.get("/sendmail", sendMail)

module.exports = router;