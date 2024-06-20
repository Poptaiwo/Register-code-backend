const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./route/user.route');
require('dotenv').config()

let PORT = process.env.PORT
let URI = process.env.URI

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use("/", router)


app.listen(PORT,()=>{
    mongoose.connect(URI)
    .then(()=>{
        console.log("Database is connected")
        console.log("Server is running on port:" + PORT)
    })
    })