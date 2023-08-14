//.env
if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

//require modules
const express = require('express');
const app = express(); 
const path = require('path');
const methodOverride = require('method-override')

//require passport
const passport = require('passport')
const localStrategy = require('passport-local')

//require admin and user models
const User = require("./models/user/user")
const Admin = require("./models/admin/admin")

//requre routes
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

//set paths for ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//for static files
app.use(express.static(path.join(__dirname,'/public')))

//to parse the data from req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const dbUrl = process.env.DB_URL
//'mongodb://127.0.0.1:27017/TZM'
//process.env.DB_URL

const MongoDBStore = require("connect-mongo")
const store = new MongoDBStore({
    mongoUrl: dbUrl,
    secret: 'siuuuu',
    touchAfter: 24 * 60 * 60
})

//sessions
const session = require('express-session')

const sessionConfig = {
    store,
    name: 'yourSession',
    secret: "siuuuucret", 
    httpOnly: true,
    resave: false, 
    saveUninitialized: true,
    cookie: {
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

//for passport
app.use(passport.initialize())
app.use(passport.session())


passport.use("user-local" ,new localStrategy(User.authenticate()))
passport.use("admin-local" ,new localStrategy(Admin.authenticate()))
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for flash
const flash = require('connect-flash')
app.use(flash())

//for login & flash
app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

//connect to mongoDB using mongoose
const mongoose = require("mongoose");
mongoose.connect(dbUrl)
.then(()=>{
    console.log("Database successfully connected");
})
.catch((err)=>{
    console.log("An error occured while connecting to the database");
    console.log(err)
})

//open the port - start listening
app.listen(3000, ()=>{
    console.log("LISTENING ON PORT 3000!")
});

//routes
//default route
app.get('/', (req,res)=>{
    res.render('home')
})

//CRUD
app.use("/admin", adminRoutes)
app.use("/user", userRoutes)


//user home

//user login

//user register



//admin home

//admin login

//admin register

//admin playlist

// admin customer mng