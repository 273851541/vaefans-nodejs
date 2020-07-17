const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const db = require("./db/connect")
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const userRouter = require("./router/userRouter")
const todayRouter = require("./router/todayRouter")
const loveRouter = require("./router/loveRouter")

app.use('/static',express.static(path.join(__dirname,'static')))
app.use("/user",userRouter)
app.use("/today",todayRouter)
app.use("/love",loveRouter)

app.listen(8080,()=>{
    console.log("server start")
})