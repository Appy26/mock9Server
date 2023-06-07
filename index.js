const express = require('express');
const connection = require('./config/db');
const { userRouter } = require('./Routes/user.routes');
const authentication = require('./middlewares/authenticate');
const { postRoute } = require('./Routes/post.routes');
const cors = require('cors');
require("dotenv").config()
const app = express();

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send({"msg":"hello world"})
})
app.use("/user", userRouter)
app.use(authentication)
app.use("/post", postRoute)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log({ "msg": "connected" })
        console.log({ "msg": "connected to db" })
    } catch (error) {
        console.log({ "msg": error.message })
    }
})

