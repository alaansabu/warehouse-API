const express = require('express');
const {addStock,upadateStock} = require('../controllers/controllers') 

const Router = express.Router()

Router.post("/addStock",addStock)
Router.patch("/updateDetails/:brand",upadateStock)


module.exports = Router
