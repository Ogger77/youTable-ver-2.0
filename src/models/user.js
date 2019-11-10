const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        default: 1,
        validate(value){
            if(value < 0){
                throw new Error('Number must be larger than 1')
            }
        }
    },
    phone: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }    
})

const User = mongoose.model("User", userSchema);

module.exports = User;