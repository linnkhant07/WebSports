const express = require('express')
const router = express.Router()
const admin = require("../controllers/admin")
const catchAsync = require("../utils/catchAsync")
const passport = require('passport')

// //CRUD
router.route("/")
.get(admin.index)

router.route("/login")
.get(admin.renderLogInForm)
.post(
    passport.authenticate('admin-local', {failureFlash: true, failureRedirect: '/admin/login', keepSessionInfo: true}),  
    admin.loginAdmin
)

router.route("/register")
.get(admin.renderRegisterForm)
.post(catchAsync(admin.registerAdmin))

//customer mgmt
router.route("/customers")
.get(admin.renderCustomers)

//playlist
router.route("/playlist")
.get(admin.renderPlaylist)


router.get('/logout', admin.logOutAdmin)

module.exports = router
