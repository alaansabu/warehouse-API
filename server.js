const { configDotenv } = require('dotenv');
const connect = require('./config/conifg')
configDotenv();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
connect()

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(PORT,(req,res)=>{

console.log("server running at port 5000");


})
