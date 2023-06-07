const express = require('express');
const postRoute = express.Router()
const {postModel} = require("../models/post.model")

postRoute.get("/", async (req, res) => {
    try {
  let post=await postModel.find()
        res.send({ "msg": post}) 
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

postRoute.post("/add", async (req, res) => {
try {
    let post = new postModel(req.body)
    post.save()
    res.send({ "msg": "added new post" })
} catch (error) {
    res.send({ "msg": error.message })
}
})


postRoute.patch("/update/:id", async (req, res) => {
        try {
            let payload = req.body;
            let id = req.params.id;
            await postModel.findByIdAndUpdate({ _id: id }, payload)
            res.send({ "msg": "successfully updated" })
        } catch (error) {
            res.send({ "msg": error.message })
        }
})
    
postRoute.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        await postModel.findByIdAndDelete({ _id: id })
        res.send({ "msg": "successfully Deleted" })
    } catch (error) {
        res.send({ "msg": error.message })
    }
})








module.exports ={ postRoute}

