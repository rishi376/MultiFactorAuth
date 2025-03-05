const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniques: true
    },
    password: {
        type: String,
        required: String
    },
    phone: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: false
    },
    logincode: {
        type: String,
        default: "",
        required: false
    },
    codeExpires: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);