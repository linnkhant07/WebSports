//this file is creating model for mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set("strictQuery", true)
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
