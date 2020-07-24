const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require("./db/connect")
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors())

const userRouter = require("./router/userRouter")
const todayRouter = require("./router/todayRouter")
const blogRouter = require("./router/blogRouter")
const loveRouter = require("./router/loveRouter")

app.use('/static',express.static(path.join(__dirname,'static')))
app.use("/user",userRouter)
app.use("/today",todayRouter)
app.use("/blog",blogRouter)
app.use("/love",loveRouter)

app.listen(8081,()=>{
    console.log("server start")
})
