const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    profilePic: {
        public_id:String,
        url:String
    }
    
},{timestamps:true});



module.exports = mongoose.model("User", UserSchema);