const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        required: true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password can't contain the word 'password'")
            }
        }
    },
    // adminPass: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

adminSchema.methods.toJSON = function(){
    const admin = this
    const adminObject = admin.toObject();

    delete adminObject.password;
    delete adminObject.tokens;

    return adminObject;
}

adminSchema.methods.generateAuthToken = async function(){
    const admin = this;
    const token = jwt.sign({ _id: admin.id }, process.env.JWT_SECRET);

    admin.tokens = admin.tokens.concat({ token });
    await admin.save();

    return token;
}

adminSchema.statics.findByCredentials = async(email, password) => {
    const admin = await Admin.findOne({ email })

    if(!admin){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return admin
}

//hash the text password before saving
adminSchema.pre('save', async function(next){
    const admin = this
    
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;