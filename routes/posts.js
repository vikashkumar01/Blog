const express = require("express");
const User = require('../models/User');
const Post = require('../models/Post');
const cloudinary = require('cloudinary');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.photo, { folder: "posts" });

        const newPostData = {
            title: req.body.title,
            description: req.body.description,
            photo: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            username: req.body.username
        }

        const post = await  Post.create(newPostData)

        res.status(200).json({ success: true, message: post });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.put('/:id', async (req, res) => {

    const post = await Post.findById(req.params.id)
    try {
        if (post.username === req.body.username) {

            const updatedpost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });

            res.status(200).json({ success: true, message: "your post has been updated" })

        }
        else {
            res.status(400).json({ success: true, message: "you can update only your post" })
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        await cloudinary.v2.uploader.destroy(post.photo.public_id);

        await post.remove();

        res.status(200).json({ success: true, message: "your post has been deleted" })
    }
    catch (err) {

        res.status(500).json({ success: false, message: err.message })

    }
})

router.get('/:id', async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
        res.status(200).json({ success: true, message: post })
    }

    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/', async (req, res) => {

    try {

        const post = await Post.find()
        res.status(200).json({ success: true, message: post })
    }

    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

module.exports = router;