const Admin = require("../models/admin/admin")

module.exports.index = (req,res) =>{
    res.render("admin/home")
}

module.exports.renderLogInForm = (req,res) =>{
    res.render("admin/login")
}

module.exports.loginAdmin = (req,res) => {
    //if successful
    const redirectUrl = req.session.returnTo || "/admin"
    req.flash('success', "Welcome Back!")
    res.redirect(redirectUrl)
}


module.exports.registerAdmin = async (req,res,next)=>{
    try {
        const {username, email, password} = req.body.admin
        const admin = new Admin({email, username, isAdmin: true})
        const registeredAdmin = await Admin.register(admin, password)
        
        req.login(registeredAdmin, (err) => {
            if(err)
                return next(err)
            
                req.flash('success', 'Welcome to WebSports!')
            return res.redirect("/admin")
        })

    } catch (error) {
        req.flash('error', error.message)
        res.redirect("/admin/register")
    }
    
}

module.exports.renderRegisterForm = (req,res) => {
    res.render("admin/register")
}

module.exports.renderCustomers = (req, res) =>{
    res.render("admin/customer")
}

module.exports.renderPlaylist = (req,res) => {
    res.render("admin/playlist")
}


module.exports.logOutAdmin = (req, res, next) => {
    req.logout(function(err) {
        if (err)
        return next(err)
        req.flash('success', "Goodbye!")
        res.redirect('/')
        
})
}

