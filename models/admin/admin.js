//this file is creating model for mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set("strictQuery", true)
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    isAdmin: Boolean
})

adminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Admin', adminSchema)
