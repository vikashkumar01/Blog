const express = require("express");
const auth = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');

auth.post('/register', async (req, res) => {

    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic, { folder: "Profile" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePic:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        })

        const user = await newUser.save();
        res.status(200).json({ sucess: true, user })

    }
    catch (err) {
        res.status(500).json({ sucess: false, message: err.message });
    }
});

auth.post('/login', async (req, res) => {

    try {
        
        const user = await User.findOne({email: req.body.email})
        !user && res.status(400).json({ sucess: false, message:"Wrong Credential!"})

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json({ sucess: false,message:"Wrong Credential!"})

        res.status(200).json({ sucess: true, message: user })
    }
    catch (err) {
        res.status(500).json({ sucess: false, message: err.message });
    }
});




module.exports = auth
