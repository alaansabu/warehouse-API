const { configDotenv } = require('dotenv');
const connect = require('./config/conifg')
const routes = require('./routes/routes')
configDotenv();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
connect()

app.use(express.json())
app.use('/v1/api/',routes)

app.listen(PORT,(req,res)=>{

console.log("server running at port 5000");


})
