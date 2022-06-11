const express = require("express");
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');


router.put('/updateprofile/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(400).json({ sucess: true, message: "user not found" });
        }

        let username1 = user.username;

        const { username, email, profilePic } = req.body;

        if (username) {
            user.username = username;
        }

        if (email) {
            user.email = email;
        }

        if (profilePic) {

            await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(profilePic, {
                folder: "ProfilePic",
            });

            user.profilePic.public_id = myCloud.public_id;
            user.profilePic.url = myCloud.secure_url;
        }

        await user.save();

        await Post.updateMany({ username: username1 },{ $set: { username: username} });

        res.status(200).json({ sucess: true, message: "Profile Updated successfully" })

    }

    catch (err) {
        res.status(500).json({ sucess: false, message: err.message });
    }
})

router.put('/updatepassword/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(400).json({ sucess: true, message: "user not found" });
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(req.body.newPassword, salt)

        await user.save();
        res.status(200).json({ sucess: true, message: "password updated Successfully" })

    }
    catch (err) {
        res.status(500).json({ sucess: false, message: err.message });
    }
})

router.delete('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(400).json({ success: true, message: "user not found" })
        }

        await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "User has been deleted..." });

    }
    catch (err) {
        res.status(500).json({ sucess: false, message: "err.message" });
    }
})

router.get('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json({ success: true, message: others })
    }
    catch (err) {
        res.status(500).json({ sucess: false, message: err.message });
    }
})

module.exports = router