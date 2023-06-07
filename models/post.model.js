const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    text: String,
    image: String,
    createdAt: String,
    likes: Number,
    comments: Number
})

const postModel = mongoose.model("post", postSchema)

module.exports = {postModel}