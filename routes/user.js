const express = require('express')
const passport = require('passport')
const router = express.Router()
const user = require("../controllers/user")
const catchAsync = require("../utils/catchAsync")


router.route("/")
.get(user.index)

router.route("/login")
.get(user.renderLogInForm)
.post(
    passport.authenticate('user-local', {failureFlash: true, failureRedirect: '/user/login', keepSessionInfo: true}),  
    user.loginUser
)

router.route("/register")
.get(user.renderRegisterForm)
.post(catchAsync(user.registerUser))


router.get('/logout', user.logOutUser)


module.exports = router