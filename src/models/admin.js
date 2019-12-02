const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password can't contain the word 'password'")
            }
        }
    },
    password2: {
        type: String,
        minlength: 8,
        trim: true
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // },
}, {
    timestamps: true
})

adminSchema.plugin(passportLocalMongoose)

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;