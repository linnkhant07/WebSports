const User = require("../models/user/user")

module.exports.index = (req,res) =>{
    res.render("user/home")
}

module.exports.renderLogInForm = (req,res) =>{
    res.render("user/login")
}

module.exports.loginUser = (req,res) => {
    //if successful
    const redirectUrl = req.session.returnTo || "/user"
    req.flash('success', "Welcome Back!")
    res.redirect(redirectUrl)
}

module.exports.renderRegisterForm = (req,res) => {
    res.render("user/register")
}

module.exports.registerUser = async (req,res,next)=>{
    try {

        const {username, email, password} = req.body.user
        const user = new User({email, username})
        const registeredUser = await User.register(user, password)
        
        req.login(registeredUser, (err) => {
            if(err)
                return next(err)
            
            req.flash('success', 'Welcome to WebSports!')
            return res.redirect("/user")
        })

    } catch (error) {
        req.flash('error', error.message)
        res.redirect("/user/register")
    }
    
}

module.exports.logOutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err)
        return next(err)
        req.flash('success', "Goodbye!")
        res.redirect('/')
        
})
}


