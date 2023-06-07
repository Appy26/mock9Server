const express = require('express');
const UserModel=require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
userRouter.post("/register", async (req, res) => {
   
    try {
        let { name, email, password, dob } = req.body
        bcrypt.hash(password, 8, function (err, hash) {
            if (err) {
               res.send({"msg":"enter correct password"})
            } else {
                let user = new UserModel({ name, email, password:hash, dob })
                user.save()
                res.send({ "msg": "successfully registered" })
           }

        });
    } catch (error) {
        res.send({"msg":error.message})
    }
})


userRouter.post("/login", async (req, res) => {
    try {
        let user = await UserModel.find({ email:req.body.email })
        if (user.length > 0) {
            let { email, password } = req.body;
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (err) {
                    res.send({ "msg": "enter valid password" })
                } else {
                    let token = jwt.sign({ userId: user[0]._id }, 'Mock9');
                    res.send({ "msg": "successfully login" ,token})
             }
            });
        } else {
            res.send({ "msg": "Enter correct email" })
        }

    } catch (error) {
        res.send({ "msg": error.message })
    }
})


module.exports={userRouter}



